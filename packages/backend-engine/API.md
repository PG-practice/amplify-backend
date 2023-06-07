## API Report File for "@aws-amplify/backend-engine"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Construct } from 'constructs';
import { ConstructCache } from '@aws-amplify/plugin-types';
import { ConstructCacheEntryGenerator } from '@aws-amplify/plugin-types';
import { OutputStorageStrategy } from '@aws-amplify/plugin-types';
import { Stack } from 'aws-cdk-lib';

// @public
export class NestedStackResolver implements StackResolver {
    constructor(rootStack: Stack);
    getStackFor(resourceGroupName: string): Stack;
}

// @public
export class SingletonConstructCache implements ConstructCache {
    constructor(stackResolver: StackResolver);
    getOrCompute(generator: ConstructCacheEntryGenerator): Construct;
}

// @public
export class StackMetadataOutputStorageStrategy implements OutputStorageStrategy {
    constructor(stack: Stack);
    storeOutput(constructPackage: string, constructVersion: string, data: Record<string, string>): void;
}

// @public
export type StackResolver = {
    getStackFor(resourceGroupName: string): Stack;
};

// (No @packageDocumentation comment for this package)

```