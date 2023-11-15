output "output_path" {
  value = data.archive_file.empty_lambda.output_path
  description = "Output path to empty file."
}

output "role_arn" {
  value = aws_iam_role.lambda_exec.arn
  description = "Role arn for lambda execution."
}