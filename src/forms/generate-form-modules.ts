import * as _ from 'lodash';
import * as path from 'path';

import {isEmpty} from 'lodash';
import * as conf from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {MethodOutput} from '../requests/requests.models';
import {Parameter} from '../types';
import {createDir} from '../utils';
import {createComponentTs} from './components/angular-material/angular-material-component-ts';
import {createComponentHTML} from './components/angular-material/angular-material-component-html';
// TODO! rename
import {generateFormService} from './generate-form-service';
import {createModule} from './process-module';
import {createSharedModule} from './shared-module';
import {generateHttpActions, getActionClassNameBase, getClassName} from './states/generate-http-actions';
import {generateHttpEffects} from './states/generate-http-effects';
import {generateHttpReducers} from './states/generate-http-reducers';
import {createComponentModule} from './components/angular-material/angular-material-module';
import {createAngularMaterialSharedModule} from './components/angular-material/angular-material-shared-module';

export function createForms(config: Config, name: string, processedMethods: MethodOutput[],
                            definitions: ProcessedDefinition[], componentPrefix: string,
                            angularMaterialFormComponent: boolean) {
  const kebabName = _.kebabCase(name);
  const formBaseDir = path.join(config.dest, conf.storeDir);
  const formDirName = path.join(formBaseDir, `${kebabName}`);
  createDir(formDirName);

  for (const processedMethod of processedMethods) {
    const paramGroups = processedMethod.paramGroups;
    const responseDef = processedMethod.responseDef;
    const simpleName = processedMethod.simpleName;
    const formSubDirName = path.join(formBaseDir, `${kebabName}`, simpleName);
    createDir(formSubDirName);

    let formParams: Parameter[] = [];
    Object.values(paramGroups).forEach(params => {
      formParams = formParams.concat(params);
    });

    const actionClassNameBase = getActionClassNameBase(simpleName);
    const className = getClassName(simpleName);
    const generateForms = formParams.length >= 1;

    if (generateForms) {
      // component.ts
      generateFormService(config, name, formParams, definitions, simpleName, formSubDirName, className);
    }

    // states
    const statesDirName = path.join(formSubDirName, conf.stateDir);
    const componentsDirName = path.join(formSubDirName, conf.componentsDir);
    createDir(statesDirName);
    createDir(componentsDirName);

    // actions.ts
    generateHttpActions(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, formParams);
    // reducers.ts
    generateHttpReducers(config, actionClassNameBase, formSubDirName, responseDef.type);
    // effects.ts
    generateHttpEffects(config, name, simpleName, actionClassNameBase, formSubDirName, formParams);
    // form-shared-module.ts
    createSharedModule(config);
    // module.ts
    createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, generateForms);

    if (angularMaterialFormComponent && processedMethod.methodName !== 'get' && !isEmpty(processedMethod.paramGroups)) {
      createComponentTs(config, simpleName, formSubDirName, className, componentPrefix);
      createComponentHTML(config, formParams, definitions,
           formSubDirName, simpleName);
      createComponentModule(config, simpleName, formSubDirName, className);
      createAngularMaterialSharedModule(config);
    }
  }
}
