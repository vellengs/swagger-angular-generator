"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf = require("../../../conf");
const utils_1 = require("../../../utils");
function createComponentModule(config, simpleName, formSubDirName, className) {
    let content = '';
    content += `import {NgModule} from '@angular/core';\n`;
    content += `import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';\n`;
    content += `import {FormsSharedModule} from '../../../forms-shared.module';\n`;
    content += `import {${className}Component} from './${simpleName}.component';\n`;
    content += '\n';
    content += '@NgModule({\n';
    content += utils_1.indent('imports: [\n');
    content += utils_1.indent(`FormsSharedModule,\n`, 2);
    content += utils_1.indent(`FormsSharedAngularMaterialModule,\n`, 2);
    content += utils_1.indent('],\n');
    content += utils_1.indent('declarations: [\n');
    content += utils_1.indent(`${className}Component,\n`, 2);
    content += utils_1.indent('],\n');
    content += utils_1.indent('exports: [\n');
    content += utils_1.indent(`${className}Component,\n`, 2);
    content += utils_1.indent('],\n');
    content += '})\n';
    content += `export class ${className}Module {}`;
    content += '\n';
    const componentHTMLFileName = path.join(formSubDirName, conf.componentsDir, `${simpleName}.module.ts`);
    utils_1.writeFile(componentHTMLFileName, content, config.header);
}
exports.createComponentModule = createComponentModule;
//# sourceMappingURL=angular-material-module.js.map