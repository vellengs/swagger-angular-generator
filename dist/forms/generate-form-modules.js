"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const lodash_1 = require("lodash");
const conf = require("../conf");
const utils_1 = require("../utils");
const angular_material_component_ts_1 = require("./components/angular-material/angular-material-component-ts");
const angular_material_component_html_1 = require("./components/angular-material/angular-material-component-html");
// TODO! rename
const generate_form_service_1 = require("./generate-form-service");
const process_module_1 = require("./process-module");
const shared_module_1 = require("./shared-module");
const generate_http_actions_1 = require("./states/generate-http-actions");
const generate_http_effects_1 = require("./states/generate-http-effects");
const generate_http_reducers_1 = require("./states/generate-http-reducers");
const angular_material_module_1 = require("./components/angular-material/angular-material-module");
const angular_material_shared_module_1 = require("./components/angular-material/angular-material-shared-module");
function createForms(config, name, processedMethods, definitions, componentPrefix, angularMaterialFormComponent) {
    const kebabName = _.kebabCase(name);
    const formBaseDir = path.join(config.dest, conf.storeDir);
    const formDirName = path.join(formBaseDir, `${kebabName}`);
    utils_1.createDir(formDirName);
    for (const processedMethod of processedMethods) {
        const paramGroups = processedMethod.paramGroups;
        const responseDef = processedMethod.responseDef;
        const simpleName = processedMethod.simpleName;
        const formSubDirName = path.join(formBaseDir, `${kebabName}`, simpleName);
        utils_1.createDir(formSubDirName);
        let formParams = [];
        Object.values(paramGroups).forEach(params => {
            formParams = formParams.concat(params);
        });
        const actionClassNameBase = generate_http_actions_1.getActionClassNameBase(simpleName);
        const className = generate_http_actions_1.getClassName(simpleName);
        const generateForms = formParams.length >= 1;
        if (generateForms) {
            // component.ts
            generate_form_service_1.generateFormService(config, name, formParams, definitions, simpleName, formSubDirName, className);
        }
        // states
        const statesDirName = path.join(formSubDirName, conf.stateDir);
        const componentsDirName = path.join(formSubDirName, conf.componentsDir);
        utils_1.createDir(statesDirName);
        utils_1.createDir(componentsDirName);
        // actions.ts
        generate_http_actions_1.generateHttpActions(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, formParams);
        // reducers.ts
        generate_http_reducers_1.generateHttpReducers(config, actionClassNameBase, formSubDirName, responseDef.type);
        // effects.ts
        generate_http_effects_1.generateHttpEffects(config, name, simpleName, actionClassNameBase, formSubDirName, formParams);
        // form-shared-module.ts
        shared_module_1.createSharedModule(config);
        // module.ts
        process_module_1.createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, generateForms);
        if (angularMaterialFormComponent && processedMethod.methodName !== 'get' && !lodash_1.isEmpty(processedMethod.paramGroups)) {
            angular_material_component_ts_1.createComponentTs(config, simpleName, formSubDirName, className, componentPrefix);
            angular_material_component_html_1.createComponentHTML(config, formParams, definitions, formSubDirName, simpleName);
            angular_material_module_1.createComponentModule(config, simpleName, formSubDirName, className);
            angular_material_shared_module_1.createAngularMaterialSharedModule(config);
        }
    }
}
exports.createForms = createForms;
//# sourceMappingURL=generate-form-modules.js.map