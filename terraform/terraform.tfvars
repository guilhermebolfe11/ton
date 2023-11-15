aws_region    = "us-east-2"
api_domain    = "ton-api.guilhermebolfe.com"
project_name  = "ton"
bucket_states = "terraform-states-personal"
lambdas = {
  "POST /users" : { "function_name" : "create-user" },
  "GET /users/{id}" : { "function_name" : "get-user" },
  "POST /access" : { "function_name" : "increase-access" },
  "GET /access" : { "function_name" : "get-access" }
}