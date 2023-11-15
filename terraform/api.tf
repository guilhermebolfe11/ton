resource "aws_apigatewayv2_api" "api" {
  name          = "api-${var.project_name}"
  description   = "Ton challenge"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api.arn
    format          = "$context.identity.sourceIp - - [$context.requestTime] \"$context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId $context.integrationErrorMessage"
  }
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/aws/apigatewayv2/${aws_apigatewayv2_api.api.name}"
  retention_in_days = 1
}

data "aws_apigatewayv2_export" "api" {
  api_id        = aws_apigatewayv2_api.api.id
  specification = "OAS30"
  output_type   = "JSON"
  depends_on = [ module.endpoint ]
}




