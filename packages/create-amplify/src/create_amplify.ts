#!/usr/bin/env node

/*
  We should be very careful about how much logic we add to this package.
  If this grows beyond just copying template files, we probably should put that logic into @aws-amplify/cli and delegate to it here
  This is because packages that run as part of `npm create *` are cached in the global npx cache which is cumbersome to update / clean.
  If customers have a cached version of the create-amplify package, they might execute that cached version even after we publish features and fixes to the package on npm.
 */

import { PackageManagerControllerFactory, format } from '@aws-amplify/cli-core';
import { ProjectRootValidator } from './project_root_validator.js';
import { AmplifyProjectCreator } from './amplify_project_creator.js';
import { getProjectRoot } from './get_project_root.js';
import { GitIgnoreInitializer } from './gitignore_initializer.js';
import { InitialProjectFileGenerator } from './initial_project_file_generator.js';
import {
  attachUnhandledExceptionListeners,
  generateCommandFailureHandler,
} from './error_handler.js';

attachUnhandledExceptionListeners();
const errorHandler = generateCommandFailureHandler();

const projectRoot = await getProjectRoot();

const packageManagerControllerFactory = new PackageManagerControllerFactory(
  projectRoot
);

const packageManagerController =
  packageManagerControllerFactory.getPackageManagerController();

const amplifyProjectCreator = new AmplifyProjectCreator(
  projectRoot,
  packageManagerController,
  new ProjectRootValidator(projectRoot),
  new GitIgnoreInitializer(projectRoot),
  new InitialProjectFileGenerator(projectRoot, packageManagerController)
);

try {
  await amplifyProjectCreator.create();
} catch (err) {
  if (err instanceof Error) {
    await errorHandler(format.error(err), err);
  }
}
