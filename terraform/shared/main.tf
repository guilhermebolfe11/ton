data "aws_iam_policy_document" "dynamo_all" {
  statement {
    actions   = ["dynamodb:*"]
    resources = ["arn:aws:dynamodb:*"]
    effect    = "Allow"
  }
}

resource "aws_iam_policy" "dynamo_all" {
  name   = "lambda-dynamo-all-${var.project_name}"
  policy = data.aws_iam_policy_document.dynamo_all.json
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda-exec-${var.project_name}"

  assume_role_policy = jsonencode(
    {
      Version : "2012-10-17",
      Statement : [
        {
          Action : "sts:AssumeRole",
          Principal : {
            Service : "lambda.amazonaws.com"
          },
          Effect : "Allow",
          Sid : ""
        }
      ]
  })

}

resource "aws_iam_role_policy_attachment" "role_exec_basic" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "role_exec_dynamo" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.dynamo_all.arn
}

data "archive_file" "empty_lambda" {
  type        = "zip"
  output_path = "${path.module}/empty_lambda.zip"

  source {
    content  = "exports.handler = function() { return { statusCode:200, body: 'Empty file'} };"
    filename = "index.js"
  }
}