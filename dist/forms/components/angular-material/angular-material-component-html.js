"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../../../utils");
const _ = require("lodash");
const common_1 = require("../../../common");
const conf = require("../../../conf");
const conf_1 = require("../../../conf");
const process_params_1 = require("../../../requests/process-params");
function createComponentHTML(config, params, definitions, formSubDirName, simpleName) {
    const submitFunctionName = `${simpleName.toLowerCase()}`;
    let content = '';
    content = getBeginingOfFile(content, submitFunctionName, simpleName);
    content = getFieldDefinition(params, definitions, content, simpleName);
    content = getEndOfFile(content, simpleName);
    const componentTsFileName = path.join(formSubDirName, conf.componentsDir, `${simpleName}.component.html`);
    utils_1.writeFile(componentTsFileName, content, config.header, 'html');
}
exports.createComponentHTML = createComponentHTML;
function getBeginingOfFile(content, submitFunctionName, simpleName) {
    content += '<mat-card>\n';
    content += utils_1.indent(`<mat-card-title>${simpleName}</mat-card-title>\n`);
    content += '\n';
    content += utils_1.indent(`<mat-card-content>\n`, 2);
    content += utils_1.indent(`<div class='row'>\n`, 3);
    content += utils_1.indent(`<div class='col-12'>\n`, 4);
    content += '\n';
    content += utils_1.indent(`<form [formGroup]="${simpleName}FormService.form" (ngSubmit)="${submitFunctionName}()" class="full-width">\n`, 5);
    content += '\n';
    return content;
}
exports.getBeginingOfFile = getBeginingOfFile;
function getEndOfFile(content, simpleName) {
    content += utils_1.indent(`<button mat-raised-button color="primary" type="submit" [disabled]="${simpleName}FormService.form.invalid">Save</button>\n`, 6);
    content += utils_1.indent('</form>\n', 5);
    content += '\n';
    content += utils_1.indent('</div>\n', 3);
    content += utils_1.indent('</div>\n', 2);
    content += utils_1.indent('</mat-card-content>\n');
    content += '</mat-card>';
    return content;
}
exports.getEndOfFile = getEndOfFile;
function getFieldDefinition(params, definitions, content, simpleName) {
    const definitionsMap = _.groupBy(definitions, 'name');
    const parentTypes = [];
    content += walkParamOrProp(params, undefined, definitionsMap, parentTypes, simpleName);
    return content;
}
exports.getFieldDefinition = getFieldDefinition;
function walkParamOrProp(definition, newPath = [], definitions, parentTypes, simpleName) {
    const result = [];
    let schema;
    let required;
    // create unified inputs for
    // 1. parameters
    if (Array.isArray(definition)) {
        schema = {};
        required = [];
        definition.forEach(param => {
            if (param.required)
                required.push(param.name);
            schema[param.name] = process_params_1.parameterToSchema(param);
        });
        // 2. object definition
    }
    else {
        required = definition.def.required;
        schema = definition.def.properties;
    }
    // walk the list and build recursive form model
    Object.entries(schema).forEach(([paramName, param]) => {
        const ref = param.$ref;
        // break type definition chain with cycle
        if (parentTypes.indexOf(ref) >= 0)
            return;
        const name = paramName;
        const updatedNewPath = [...newPath, name];
        const isRequired = required && required.includes(name);
        let newParentTypes = [];
        if (ref)
            newParentTypes = [...parentTypes, ref];
        const fieldDefinition = createFieldDefinition(param, ref, name, updatedNewPath, isRequired, definitions, newParentTypes, simpleName);
        result.push(fieldDefinition);
    });
    return utils_1.indent(result);
}
function createFieldDefinition(param, ref, name, newPath, required, definitions, parentTypes, simpleName) {
    let definition;
    let type = param.type;
    let formField = '';
    if (type) {
        if (type in conf_1.nativeTypes) {
            const typedType = type;
            type = conf_1.nativeTypes[typedType];
        }
        // arrays => selects
        if (type === 'array') {
        }
        else {
            formField = getFormFieldDefinition(formField, param, required, name, simpleName, newPath);
        }
    }
    else {
        const refType = ref.replace(/^#\/definitions\//, '');
        definition = definitions[common_1.normalizeDef(refType)][0];
        formField += walkParamOrProp(definition, newPath, definitions, parentTypes, simpleName);
    }
    return formField;
}
function getValidators(param) {
    const validators = [];
    if (param.format && param.format === 'email') {
        validators.push({ type: 'email', errorDescription: 'Email has invalid format' });
    }
    if (param.maxLength)
        validators.push({ type: 'maxLength', errorDescription: 'Maximum length exceeded' });
    if (param.minLength)
        validators.push({ type: 'minLength', errorDescription: 'Too short' });
    if (param.pattern)
        validators.push({ type: 'pattern', errorDescription: 'Value does not comply with rules' });
    return validators;
}
function getFormFieldDefinition(formField, param, required, name, simpleName, newPath) {
    const fieldPath = getFieldPath(newPath);
    const validators = getValidators(param);
    let requiredInputAttr = '';
    if (required) {
        requiredInputAttr = 'required';
        validators.push({ type: requiredInputAttr, errorDescription: 'This field is required' });
    }
    formField += utils_1.indent(`<div class="row">\n`, 6);
    formField += utils_1.indent(`<div class="col-12">\n`, 7);
    formField += '\n';
    formField += utils_1.indent(`<mat-form-field class="form-full-width">\n`, 8);
    formField += utils_1.indent(`<input matInput type="text" name="${name}" ${requiredInputAttr} [formControl]="${simpleName}FormService.form.get('${fieldPath}')" placeholder="${name}" />\n`, 9);
    for (const validator of validators) {
        formField += utils_1.indent(`<mat-error *ngIf="${simpleName}FormService.form.get('${fieldPath}') && ${simpleName}FormService.form.get('${fieldPath}').hasError('${validator.type}')">${validator.errorDescription}</mat-error>\n`, 9);
    }
    formField += utils_1.indent('</mat-form-field>\n', 8);
    formField += '\n';
    formField += utils_1.indent('</div>\n', 7);
    formField += utils_1.indent('</div>\n', 6);
    formField += '\n';
    return formField;
}
function getFieldPath(newPath) {
    const fieldPathParentArray = [];
    let fieldPathParent = '';
    if (newPath.length) {
        for (const np of newPath) {
            fieldPathParentArray.push(np);
            fieldPathParent = fieldPathParentArray.join('.');
        }
    }
    return fieldPathParent;
}
//# sourceMappingURL=angular-material-component-html.js.map