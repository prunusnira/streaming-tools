#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { OAuthLambdaStack } from "../lib/oauth-lambda-stack.js";

const app = new cdk.App();

new OAuthLambdaStack(app, "StreamingToolsOAuthLambdaStack", {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION ?? "ap-northeast-2",
    },
});
