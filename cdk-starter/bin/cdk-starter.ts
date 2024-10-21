#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotosStack } from '../lib/PhotosStack';

const app = new cdk.App(); // app require to run all our other stacks
// new CdkStarterStack(app, 'CdkStarterStack'); // all stacks belong to a application
new PhotosStack(app, 'PhotosStack')