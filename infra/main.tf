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

# S3
module "s3" {
  source   = "./modules/s3"
  app_name = var.app_name
  region   = var.region
}

# BASH
module "bash" {
  source       = "./modules/bash"
  s3_bucket_id = module.s3.s3_bucket_id
}

# IAM
module "iam" {
  source           = "./modules/iam"
  app_name         = var.app_name
  region           = var.region
  s3_bucket_name   = module.s3.s3_bucket_name
  kendra_index_arn = module.kendra.kendra_index_arn
}

# kendra
module "kendra" {
  source          = "./modules/kendra"
  app_name        = var.app_name
  s3_bucket_name  = module.s3.s3_bucket_name
  iam_role_kendra = module.iam.iam_role_kendra
}

# lambda
module "lambda" {
  source            = "./modules/lambda"
  iam_role_lambda   = module.iam.iam_role_lambda
  app_name          = var.app_name
  api_execution_arn = module.apigateway.api_execution_arn
  kendra_index_id   = module.kendra.kendra_index_id
}

# apigateway
module "apigateway" {
  source            = "./modules/apigateway"
  lambda_invoke_arn = module.lambda.lambda_invoke_arn
  iam_role_lambda   = module.iam.iam_role_lambda
  region            = var.region
  app_name          = var.app_name
}
