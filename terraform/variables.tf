variable "aws_region" {
  description = "Region where the project is deployed."
  type        = string
}

variable "api_domain" {
  description = "Domain under which the API should be deployed."
  type        = string
}

variable "project_name" {
  description = "Name of project."
  type        = string
}

variable "lambdas" {
  description = "Project lambdas. Ex: {'POST /example':{'function_name':'example'}}."
  type = map(object({
    function_name = string
  }))
}

variable "bucket_states" {
  description = "Bucket to storage .tfstate"
  type        = string
}

variable "counter_api_url" {
  description = "Base url from counter api"
  type        = string
}

variable "counter_api_key" {
  description = "Key from api"
  type        = string
}
