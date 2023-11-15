output "endpoint" {
  description = "HTTP API endpoint URL"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "docs" {
  description = "OpenAPI doc"
  value       = data.aws_apigatewayv2_export.api.body
}
