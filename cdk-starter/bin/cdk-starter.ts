#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
// import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotosStack } from "../lib/PhotosStack";
import { PhotosHandlerStack } from "../lib/PhotosHandlerStack";
import { BucketTagger } from "./Tagger";

const app = new cdk.App(); // app require to run all our other stacks
// new CdkStarterStack(app, 'CdkStarterStack'); // all stacks belong to a application
// new PhotosStack(app, 'PhotosStack');
// new PhotosHandlerStack(app, 'PhotosHandlerStack');
const photosStack = new PhotosStack(app, "PhotosStack");
new PhotosHandlerStack(app, "PhotosHandlerStack", {
  targetBucketArn: photosStack.photosBucketArn,
});
const tagger = new BucketTagger("level", "test");
cdk.Aspects.of(app).add(tagger);
