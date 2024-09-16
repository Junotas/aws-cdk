#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyProjectTsStack } from '../lib/my-project-ts-stack';

const app = new cdk.App();
new MyProjectTsStack(app, 'MyProjectTsStack');