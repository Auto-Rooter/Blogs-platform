variable "region" {
    description = "AWS region"
    type = string
    default = "eu-central-1"
}

variable "project_name" {
    description = "Project name"
    type = string
    default = "Blogs-platform"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type = string
  default = "10.0.0.0/16"
}

variable "public_subnets_cidrs" {
  description = "Public subnets CIDRs"
  type = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones"
  type = List(string)
  default = ["eu-central-1a", "eu-central-1b"]
}

variable "container_image" {
    description = "Docker Image URL"
    type = string
}

variable "mongo_uri" {
    description = "Mongodb connection string"
    type = string
    sensitive = true
}

variable "jwt_secret" {
    description = "JWT secret key"
    type = string
    sensitive = true
}