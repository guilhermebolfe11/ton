resource "aws_dynamodb_table" "users" {
  name         = "${var.project_name}-Users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
