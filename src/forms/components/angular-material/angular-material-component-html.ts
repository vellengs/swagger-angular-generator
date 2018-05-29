import * as path from 'path';
import {ProcessedDefinition} from '../../../definitions';
import {Config} from '../../../generate';
import {NativeNames, Parameter, Schema} from '../../../types';
import {indent, writeFile} from '../../../utils';

import * as _ from 'lodash';
import {normalizeDef} from '../../../common';
import * as conf from '../../../conf';
import {nativeTypes} from '../../../conf';
import {parameterToSchema} from '../../../requests/process-params';

export interface Validator {
  type: string;
  errorDescription: string;
}

export function createComponentHTML(config: Config, params: Parameter[],
                                    definitions: ProcessedDefinition[], formSubDirName: string,
                                    simpleName: string) {
  const submitFunctionName = `${simpleName.toLowerCase()}`;

  let content = '';
  content = getBeginingOfFile(content, submitFunctionName, simpleName);

  content = getFieldDefinition(params, definitions, content, simpleName);
  content = getEndOfFile(content, simpleName);

  const componentTsFileName = path.join(formSubDirName, conf.componentsDir, `${simpleName}.component.html`);
  writeFile(componentTsFileName, content, config.header, 'html');
}

export function getBeginingOfFile(content: string, submitFunctionName: string, simpleName: string) {
  content += '<mat-card>\n';
  content += indent(`<mat-card-title>${simpleName}</mat-card-title>\n`);
  content += '\n';
  content += indent(`<mat-card-content>\n`, 2);
  content += indent(`<div class='row'>\n`, 3);
  content += indent(`<div class='col-12'>\n`, 4);
  content += '\n';
  content += indent(
      `<form [formGroup]="${simpleName}FormService.form" (ngSubmit)="${submitFunctionName}()" class="full-width">\n`, 5);
  content += '\n';
  return content;
}

export function getEndOfFile(content: string, simpleName: string) {
  content += indent(`<button mat-raised-button color="primary" type="submit" [disabled]="${simpleName}FormService.form.invalid">Save</button>\n`, 6);
  content += indent('</form>\n', 5);
  content += '\n';
  content += indent('</div>\n', 3);
  content += indent('</div>\n', 2);
  content += indent('</mat-card-content>\n');
  content += '</mat-card>';
  return content;
}

export function getFieldDefinition(params: Parameter[], definitions: ProcessedDefinition[], content: string,
                                   simpleName: string): string {

  const definitionsMap = _.groupBy(definitions, 'name');
  const parentTypes: string[] = [];
  content += walkParamOrProp(params, undefined, definitionsMap, parentTypes, simpleName);
  return content;
}

function walkParamOrProp(definition: Parameter[] | ProcessedDefinition, newPath: string[] = [],
                         definitions: _.Dictionary<ProcessedDefinition[]>, parentTypes: string[],
                         simpleName: string): string {
  const result: string[] = [];
  let schema: Record<string, Schema>;
  let required: string[];

  // create unified inputs for
  // 1. parameters
  if (Array.isArray(definition)) {
    schema = {};
    required = [];
    definition.forEach(param => {
      if (param.required) required.push(param.name);
      schema[param.name] = parameterToSchema(param);
    });
  // 2. object definition
  } else {
    required = definition.def.required;
    schema = definition.def.properties;
  }

  // walk the list and build recursive form model
  Object.entries(schema).forEach(([paramName, param]) => {
    const ref = param.$ref;

    // break type definition chain with cycle
    if (parentTypes.indexOf(ref) >= 0) return;

    const name = paramName;
    const updatedNewPath = [...newPath, name];
    const isRequired = required && required.includes(name);

    let newParentTypes: string[] = [];
    if (ref) newParentTypes = [...parentTypes, ref];

    const fieldDefinition = createFieldDefinition(param, ref, name, updatedNewPath,
      isRequired, definitions, newParentTypes, simpleName);

    result.push(fieldDefinition);
  });
  return indent(result);
}

function createFieldDefinition(param: Schema, ref: string, name: string, newPath: string[], required: boolean,
                               definitions: _.Dictionary<ProcessedDefinition[]>, parentTypes: string[],
                               simpleName: string): string {

  let definition: ProcessedDefinition;
  let type = param.type;

  let formField = '';

  if (type) {
    if (type in nativeTypes) {
      const typedType = type as NativeNames;
      type = nativeTypes[typedType];
    }

    // arrays => selects
    if (type === 'array') {

    } else {
      formField = getFormFieldDefinition(formField, param, required, name,
        simpleName, newPath);
    }
  } else {
    const refType = ref.replace(/^#\/definitions\//, '');
    definition = definitions[normalizeDef(refType)][0];
    formField += walkParamOrProp(definition, newPath, definitions, parentTypes, simpleName);
  }
  return formField;
}

function getValidators(param: Parameter | Schema): Validator[] {
  const validators: Validator[] = [];

  if (param.format && param.format === 'email') {
    validators.push({type: 'email', errorDescription: 'Email has invalid format'});
  }
  if (param.maxLength) validators.push({type: 'maxLength', errorDescription: 'Maximum length exceeded'});
  if (param.minLength) validators.push({type: 'minLength', errorDescription: 'Too short'});
  if (param.pattern) validators.push({type: 'pattern', errorDescription: 'Value does not comply with rules'});

  return validators;
}

function getFormFieldDefinition(formField: string, param: Schema, required: boolean, name: string,
                                simpleName: string, newPath: string[]): string {

  const fieldPath = getFieldPath(newPath);
  const validators = getValidators(param);
  let requiredInputAttr = '';
  if (required) {
    requiredInputAttr = 'required';
    validators.push({type: requiredInputAttr , errorDescription: 'This field is required'});
  }

  formField += indent(`<div class="row">\n`, 6);
  formField += indent(`<div class="col-12">\n`, 7);
  formField += '\n';
  formField += indent(`<mat-form-field class="form-full-width">\n`, 8);
  formField += indent(`<input matInput type="text" name="${name}" ${requiredInputAttr} [formControl]="${simpleName}FormService.form.get('${fieldPath}')" placeholder="${name}" />\n`, 9);
  for (const validator of validators) {
    formField += indent(
  `<mat-error *ngIf="${simpleName}FormService.form.get('${fieldPath}') && ${simpleName}FormService.form.get('${fieldPath}').hasError('${validator.type}')">${validator.errorDescription}</mat-error>\n`, 9);
  }
  formField += indent('</mat-form-field>\n', 8);
  formField += '\n';
  formField += indent('</div>\n', 7);
  formField += indent('</div>\n', 6);
  formField += '\n';
  return formField;
}

function getFieldPath(newPath: string[]): string {
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
