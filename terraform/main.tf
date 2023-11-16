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
  for_each      = var.endpoints
  source        = "./endpoint"
  route_key     = each.key
  function_name = each.value.function_name
  api_id        = aws_apigatewayv2_api.api.id
  api_arn       = aws_apigatewayv2_api.api.execution_arn
  project_name  = var.project_name
  output_path   = module.shared.output_path
  role_arn      = module.shared.role_arn
  authorizer_id = aws_apigatewayv2_authorizer.api.id
  with_auth     = each.value.with_auth
  env_vars = {
    USERS_TABLE     = aws_dynamodb_table.users.name
    COUNTER_TABLE   = aws_dynamodb_table.counters.name
    COUNTER_API_KEY = var.counter_api_key
    COUNTER_API_URL = var.counter_api_url
  }
}
