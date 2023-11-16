resource "aws_lambda_function" "this" {
  function_name = var.function_name
  filename      = var.output_path
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  memory_size   = 256
  timeout       = 27
  role          = var.role_arn
  environment {
    variables = var.env_vars
  }
  lifecycle {
    ignore_changes = [
      filename
    ]
  }
}

resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/lambda/${aws_lambda_function.this.function_name}"
  retention_in_days = 1
}

resource "aws_lambda_permission" "this" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.this.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_arn}/*/*"
}

resource "aws_apigatewayv2_integration" "this" {
  api_id                 = var.api_id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  connection_type        = "INTERNET"
  description            = "Lambda integration ${var.function_name}"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.this.invoke_arn
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = var.api_id
  route_key = var.route_key
  target    = "integrations/${aws_apigatewayv2_integration.this.id}"
  authorization_type = var.with_auth ? "CUSTOM" : null
  authorizer_id = var.with_auth ? var.authorizer_id: null
}
