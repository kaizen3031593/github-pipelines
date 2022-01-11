#!/usr/bin/env node
const startTime = new Date();
import * as cdk from 'aws-cdk-lib';
const elapsed = (new Date().getTime() - startTime.getTime());
console.log(`Loaded aws-cdk-lib in ${elapsed} ms`);import { NewcdkStack } from '../lib/newcdk-stack';

const app = new cdk.App();
new NewcdkStack(app, 'NewcdkStack');
