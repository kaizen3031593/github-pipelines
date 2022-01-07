#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NewcdkStack } from '../lib/newcdk-stack';

const app = new cdk.App();
new NewcdkStack(app, 'NewcdkStack');
