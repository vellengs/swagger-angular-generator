import * as path from 'path';
import * as conf from '../../../conf';
import {Config} from '../../../generate';
import {indent, writeFile} from '../../../utils';

export function createComponentTs(config: Config, simpleName: string, formSubDirName: string,
                                  className: string, componentPrefix: string) {

  let content = '';
  content = getImports(content, simpleName, className);
  content = getComponent(simpleName, content, componentPrefix);

  content += `export class ${className}Component implements OnInit {\n`;

  content = getConstructor(content, simpleName, className);
  content = getNgOnInit(content);
  content = getFormSubmitFunction(content, simpleName);
  content += '}\n';

  const componentHTMLFileName = path.join(formSubDirName, conf.componentsDir, `${simpleName}.component.ts`);
  writeFile(componentHTMLFileName, content, config.header);
}

export function getImports(content: string, simpleName: string, className: string) {
  content += 'import {Component, OnInit} from \'@angular/core\';\n';
  content += `import {Store} from '@ngrx/store';\n`;
  content += `import {${className}FormService} from '../${simpleName}.service';\n`;
  content += `import {Start} from '../states/actions';\n`;
  content += '\n';
  return content;
}

export function getComponent(simpleName: string, content: string, componentPrefix: string) {
  content += '@Component({\n';
  content += indent(getSelector(componentPrefix, simpleName));
  content += indent(`templateUrl: './${simpleName}.component.html',\n`);
  content += '})\n';
  content += '\n';
  return content;
}

function getSelector(componentPrefix: string, simpleName: string) {
  const dashedName = simpleName.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
  if (componentPrefix) return `selector: '${componentPrefix}-${dashedName}',\n`;
  else return `selector: '${dashedName}',\n`;
}

export function getConstructor(content: string, simpleName: string, className: string) {
  content += indent('constructor(\n');
  content += indent(indent(`public ${simpleName}FormService: ${className}FormService,\n`));
  content += indent(indent('private store: Store<{}>,\n'));
  content += indent(') {}\n');
  content += '\n';
  return content;
}

export function getNgOnInit(content: string) {
  content += indent('ngOnInit() {\n');
  content += indent('}\n');
  content += '\n';
  return content;
}

export function getFormSubmitFunction(content: string, simpleName: string) {
  content += indent(`${simpleName.toLowerCase()}() {\n`);
  content += indent(indent(`this.store.dispatch(new Start(this.${simpleName}FormService.form.value));\n`));
  content += indent('}\n');
  content += '\n';
  return content;
}
