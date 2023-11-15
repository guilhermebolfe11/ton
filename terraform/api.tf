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

data "aws_apigatewayv2_export" "api" {
  api_id        = aws_apigatewayv2_api.api.id
  specification = "OAS30"
  output_type   = "JSON"
  depends_on    = [module.endpoint]
}




