import * as path from 'path';
import * as conf from '../../../conf';
import {Config} from '../../../generate';
import {indent, writeFile} from '../../../utils';

export function createComponentModule(config: Config, simpleName: string, formSubDirName: string,
                                      className: string) {
  let content = '';

  content += `import {NgModule} from '@angular/core';\n`;
  content += `import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';\n`;
  content += `import {FormsSharedModule} from '../../../forms-shared.module';\n`;
  content += `import {${className}Component} from './${simpleName}.component';\n`;
  content += '\n';
  content += '@NgModule({\n';
  content += indent('imports: [\n');
  content += indent(`FormsSharedModule,\n`, 2);
  content += indent(`FormsSharedAngularMaterialModule,\n`, 2);
  content += indent('],\n');
  content += indent('declarations: [\n');
  content += indent(`${className}Component,\n`, 2);
  content += indent('],\n');
  content += indent('exports: [\n');
  content += indent(`${className}Component,\n`, 2);
  content += indent('],\n');
  content += '})\n';

  content += `export class ${className}Module {}`;
  content += '\n';

  const componentHTMLFileName = path.join(formSubDirName, conf.componentsDir, `${simpleName}.module.ts`);
  writeFile(componentHTMLFileName, content, config.header);
}
