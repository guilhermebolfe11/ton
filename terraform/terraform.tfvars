endpoints = {
  "POST /users" : { "function_name" : "create-user", "with_auth" : false },
  "GET /users/{id}" : { "function_name" : "get-user", "with_auth" : false },
  "POST /access" : { "function_name" : "increase-access", "with_auth" : false },
  "GET /access" : { "function_name" : "get-access", "with_auth" : false }
}
