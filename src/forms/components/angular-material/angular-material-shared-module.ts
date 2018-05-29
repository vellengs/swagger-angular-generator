import * as path from 'path';
import * as conf from '../../../conf';
import {Config} from '../../../generate';
import {indent, writeFile} from '../../../utils';

export function createAngularMaterialSharedModule(config: Config) {
  let content = '';
  content += `import {CommonModule} from '@angular/common';\n`;
  content += `import {NgModule} from '@angular/core';\n`;
  content += 'import {\n';
  content += 'MatButtonModule,\n';
  content += 'MatButtonToggleModule,\n';
  content += 'MatCardModule,\n';
  content += 'MatCheckboxModule,\n';
  content += 'MatExpansionModule,\n';
  content += 'MatFormFieldModule,\n';
  content += 'MatIconModule,\n';
  content += 'MatInputModule,\n';
  content += 'MatListModule,\n';
  content += 'MatRadioModule,\n';
  content += 'MatSelectModule,\n';
  content += 'MatSliderModule,\n';
  content += 'MatSlideToggleModule,\n';
  content += 'MatTableModule,\n';
  content += 'MatToolbarModule,\n';
  content += `} from '@angular/material';\n`;

  content += '\n';
  content += '@NgModule({\n';

  content += indent('imports: [\n');
  content += indent('CommonModule,\n', 2);
  content += indent('MatToolbarModule,\n', 2);
  content += indent('MatListModule,\n', 2);
  content += indent('MatIconModule,\n', 2);
  content += indent('MatButtonModule,\n', 2);
  content += indent('MatButtonToggleModule,\n', 2);
  content += indent('MatTableModule,\n', 2);
  content += indent('MatExpansionModule,\n', 2);
  content += indent('MatCardModule,\n', 2);
  content += indent('MatInputModule,\n', 2);
  content += indent('MatRadioModule,\n', 2);
  content += indent('MatSelectModule,\n', 2);
  content += indent('MatSliderModule,\n', 2);
  content += indent('MatSlideToggleModule,\n', 2);
  content += indent('MatFormFieldModule,\n', 2);
  content += indent('MatCheckboxModule,\n', 2);
  content += indent('],\n');

  content += indent('exports: [\n');
  content += indent('CommonModule,\n', 2);
  content += indent('MatToolbarModule,\n', 2);
  content += indent('MatListModule,\n', 2);
  content += indent('MatIconModule,\n', 2);
  content += indent('MatButtonModule,\n', 2);
  content += indent('MatButtonToggleModule,\n', 2);
  content += indent('MatTableModule,\n', 2);
  content += indent('MatExpansionModule,\n', 2);
  content += indent('MatCardModule,\n', 2);
  content += indent('MatInputModule,\n', 2);
  content += indent('MatRadioModule,\n', 2);
  content += indent('MatSelectModule,\n', 2);
  content += indent('MatSliderModule,\n', 2);
  content += indent('MatSlideToggleModule,\n', 2);
  content += indent('MatFormFieldModule,\n', 2);
  content += indent('MatCheckboxModule,\n', 2);
  content += indent('],\n');

  content += '})\n';
  content += `export class FormsSharedAngularMaterialModule {}\n`;

  const moduleFileName = path.join(config.dest, conf.storeDir, `forms-shared-angular-material.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
