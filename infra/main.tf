terraform {
  required_version = "=1.8.2"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# IAM
module "iam" {
  source   = "./modules/iam"
  app_name = var.app_name
}

# lambda
module "lambda" {
  source            = "./modules/lambda"
  iam_role_lambda   = module.iam.iam_role_lambda
  app_name          = var.app_name
  api_execution_arn = module.apigateway.api_execution_arn
}

# S3
module "s3" {
  source   = "./modules/s3"
  app_name = var.app_name
  region   = var.region
}

# apigateway
module "apigateway" {
  source            = "./modules/apigateway"
  lambda_invoke_arn = module.lambda.lambda_invoke_arn
  iam_role_lambda   = module.iam.iam_role_lambda
  region            = var.region
  app_name          = var.app_name
}
