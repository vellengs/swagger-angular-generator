"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf = require("../../../conf");
const utils_1 = require("../../../utils");
function createComponentTs(config, simpleName, formSubDirName, className, componentPrefix) {
    let content = '';
    content = getImports(content, simpleName, className);
    content = getComponent(simpleName, content, componentPrefix);
    content += `export class ${className}Component implements OnInit {\n`;
    content = getConstructor(content, simpleName, className);
    content = getNgOnInit(content);
    content = getFormSubmitFunction(content, simpleName);
    content += '}\n';
    const componentHTMLFileName = path.join(formSubDirName, conf.componentsDir, `${simpleName}.component.ts`);
    utils_1.writeFile(componentHTMLFileName, content, config.header);
}
exports.createComponentTs = createComponentTs;
function getImports(content, simpleName, className) {
    content += 'import {Component, OnInit} from \'@angular/core\';\n';
    content += `import {Store} from '@ngrx/store';\n`;
    content += `import {${className}FormService} from '../${simpleName}.service';\n`;
    content += `import {Start} from '../states/actions';\n`;
    content += '\n';
    return content;
}
exports.getImports = getImports;
function getComponent(simpleName, content, componentPrefix) {
    content += '@Component({\n';
    content += utils_1.indent(getSelector(componentPrefix, simpleName));
    content += utils_1.indent(`templateUrl: './${simpleName}.component.html',\n`);
    content += '})\n';
    content += '\n';
    return content;
}
exports.getComponent = getComponent;
function getSelector(componentPrefix, simpleName) {
    const dashedName = simpleName.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
    if (componentPrefix)
        return `selector: '${componentPrefix}-${dashedName}',\n`;
    else
        return `selector: '${dashedName}',\n`;
}
function getConstructor(content, simpleName, className) {
    content += utils_1.indent('constructor(\n');
    content += utils_1.indent(utils_1.indent(`public ${simpleName}FormService: ${className}FormService,\n`));
    content += utils_1.indent(utils_1.indent('private store: Store<{}>,\n'));
    content += utils_1.indent(') {}\n');
    content += '\n';
    return content;
}
exports.getConstructor = getConstructor;
function getNgOnInit(content) {
    content += utils_1.indent('ngOnInit() {\n');
    content += utils_1.indent('}\n');
    content += '\n';
    return content;
}
exports.getNgOnInit = getNgOnInit;
function getFormSubmitFunction(content, simpleName) {
    content += utils_1.indent(`${simpleName.toLowerCase()}() {\n`);
    content += utils_1.indent(utils_1.indent(`this.store.dispatch(new Start(this.${simpleName}FormService.form.value));\n`));
    content += utils_1.indent('}\n');
    content += '\n';
    return content;
}
exports.getFormSubmitFunction = getFormSubmitFunction;
//# sourceMappingURL=angular-material-component-ts.js.map