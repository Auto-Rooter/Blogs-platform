provider "aws" {
  region = var.region
}

resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"
}