resource "aws_lambda_function" "auth" {
  function_name = "auth"
  filename      = module.shared.output_path
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  memory_size   = 256
  timeout       = 27
  role          = module.shared.role_arn
  lifecycle {
    ignore_changes = [
      filename
    ]
  }
  depends_on = [ module.shared ]
}

resource "aws_cloudwatch_log_group" "auth" {
  name              = "/aws/lambda/${aws_lambda_function.auth.function_name}"
  retention_in_days = 1
}

resource "aws_lambda_permission" "auth" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/authorizers/${aws_apigatewayv2_authorizer.api.id}"
}