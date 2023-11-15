data "aws_caller_identity" "current" {}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      project_name = var.project_name
    }
  }
}

terraform {
  backend "s3" {
    bucket               = var.bucket_states
    key                  = "terraform.tfstate"
    region               = var.aws_region
    dynamodb_table       = "terraforms-locks"
    workspace_key_prefix = "workspace"
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

module "shared" {
  source       = "./shared"
  project_name = var.project_name
}

module "endpoint" {
  for_each      = var.lambdas
  source        = "./endpoint"
  route_key     = each.key
  function_name = each.value.function_name
  api_id        = aws_apigatewayv2_api.api.id
  api_arn       = aws_apigatewayv2_api.api.execution_arn
  project_name  = var.project_name
  output_path   = module.shared.output_path
  role_arn      = module.shared.role_arn
}
