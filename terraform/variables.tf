variable "aws_region" {
  description = "Region where the project is deployed."
  type        = string
}

variable "project_name" {
  description = "Name of project."
  type        = string
}

variable "endpoints" {
  description = "Endpoints of Api. Ex: {'POST /example':{'function_name':'example', 'with_auth': false}}."
  type = map(object({
    function_name = string
    with_auth = bool
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
