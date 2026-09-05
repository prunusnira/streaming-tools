import * as path from "node:path";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

const executionRoleArn = "arn:aws:iam::461696010091:role/service-role/streaming-tools-be-role-31teuao6";

export class OAuthLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const executionRole = iam.Role.fromRoleArn(
            this,
            "ExistingExecutionRole",
            executionRoleArn,
            { mutable: false },
        );

        const oauthFunction = new NodejsFunction(this, "OAuthFunction", {
            architecture: lambda.Architecture.X86_64,
            entry: path.join(import.meta.dirname, "../../src/index.ts"),
            functionName: "streaming-tools-be",
            handler: "handler",
            memorySize: 128,
            role: executionRole,
            runtime: lambda.Runtime.NODEJS_24_X,
            timeout: cdk.Duration.seconds(3),
            environment: {
                TWITCH_CLIENT_SECRET_PARAMETER: "/streamingTools/TWITCH_CLIENT_SECRET",
                CHZZK_CLIENT_SECRET_PARAMETER: "/streamingTools/CHZZK_CLIENT_SECRET",
                SOOP_CLIENT_SECRET_PARAMETER: "/streamingTools/SOOP_CLIENT_SECRET",
            },
            bundling: {
                minify: true,
                sourceMap: true,
                target: "node24",
            },
        });
        oauthFunction.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

        new cdk.CfnOutput(this, "OAuthFunctionArn", { value: oauthFunction.functionArn });
        new cdk.CfnOutput(this, "OAuthFunctionName", { value: oauthFunction.functionName });
    }
}
