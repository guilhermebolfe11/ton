variable "route_key" {
  description = "Route key for endpoint"
  type        = string
}

variable "function_name" {
  description = "Name of lambda"
  type        = string
}

variable "api_id" {
  description = "Identifier of api"
  type = string
}

variable "project_name" {
  description = "Name of project"
  type        = string
}

variable "api_arn" {
  description = "Arn of api"
  type = string
}

variable "output_path" {
  description = "Output path to file empty"
  type = string
}

variable "role_arn" {
  description = "Role arn"
  type = string
}

