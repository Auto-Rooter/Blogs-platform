terraform {
  backend "s3" {
    bucket         = "blogs-system-terraform-state"
    key            = "blogs-platform/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}