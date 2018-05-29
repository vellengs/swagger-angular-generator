"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf = require("../../../conf");
const utils_1 = require("../../../utils");
function createAngularMaterialSharedModule(config) {
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
    content += utils_1.indent('imports: [\n');
    content += utils_1.indent('CommonModule,\n', 2);
    content += utils_1.indent('MatToolbarModule,\n', 2);
    content += utils_1.indent('MatListModule,\n', 2);
    content += utils_1.indent('MatIconModule,\n', 2);
    content += utils_1.indent('MatButtonModule,\n', 2);
    content += utils_1.indent('MatButtonToggleModule,\n', 2);
    content += utils_1.indent('MatTableModule,\n', 2);
    content += utils_1.indent('MatExpansionModule,\n', 2);
    content += utils_1.indent('MatCardModule,\n', 2);
    content += utils_1.indent('MatInputModule,\n', 2);
    content += utils_1.indent('MatRadioModule,\n', 2);
    content += utils_1.indent('MatSelectModule,\n', 2);
    content += utils_1.indent('MatSliderModule,\n', 2);
    content += utils_1.indent('MatSlideToggleModule,\n', 2);
    content += utils_1.indent('MatFormFieldModule,\n', 2);
    content += utils_1.indent('MatCheckboxModule,\n', 2);
    content += utils_1.indent('],\n');
    content += utils_1.indent('exports: [\n');
    content += utils_1.indent('CommonModule,\n', 2);
    content += utils_1.indent('MatToolbarModule,\n', 2);
    content += utils_1.indent('MatListModule,\n', 2);
    content += utils_1.indent('MatIconModule,\n', 2);
    content += utils_1.indent('MatButtonModule,\n', 2);
    content += utils_1.indent('MatButtonToggleModule,\n', 2);
    content += utils_1.indent('MatTableModule,\n', 2);
    content += utils_1.indent('MatExpansionModule,\n', 2);
    content += utils_1.indent('MatCardModule,\n', 2);
    content += utils_1.indent('MatInputModule,\n', 2);
    content += utils_1.indent('MatRadioModule,\n', 2);
    content += utils_1.indent('MatSelectModule,\n', 2);
    content += utils_1.indent('MatSliderModule,\n', 2);
    content += utils_1.indent('MatSlideToggleModule,\n', 2);
    content += utils_1.indent('MatFormFieldModule,\n', 2);
    content += utils_1.indent('MatCheckboxModule,\n', 2);
    content += utils_1.indent('],\n');
    content += '})\n';
    content += `export class FormsSharedAngularMaterialModule {}\n`;
    const moduleFileName = path.join(config.dest, conf.storeDir, `forms-shared-angular-material.module.ts`);
    utils_1.writeFile(moduleFileName, content, config.header);
}
exports.createAngularMaterialSharedModule = createAngularMaterialSharedModule;
//# sourceMappingURL=angular-material-shared-module.js.map