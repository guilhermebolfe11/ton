resource "aws_apigatewayv2_api" "api" {
  name          = "api-${var.project_name}"
  description   = "Ton challenge"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_authorizer" "api" {
  api_id                            = aws_apigatewayv2_api.api.id
  authorizer_type                   = "REQUEST"
  authorizer_uri                    = aws_lambda_function.auth.invoke_arn
  identity_sources                  = ["$request.header.Authorization"]
  name                              = "HeaderAuthorization"
  authorizer_payload_format_version = "2.0"
  enable_simple_responses           = true
  authorizer_result_ttl_in_seconds  = 300
}

data "aws_apigatewayv2_export" "api" {
  api_id        = aws_apigatewayv2_api.api.id
  specification = "OAS30"
  output_type   = "JSON"
  depends_on    = [module.endpoint]
}




