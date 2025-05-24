resource "aws_lb" "main_lb" {
  name = "${var.project_name}-alb"
  internal = false
  load_balancer_type = "application"
  subnets = aws_route_table.public[*].id

  tags = {
    Name = "${var.project_name}-alb"
  }
}

resource "aws_alb_target_group" "app" {
    name = "${var.project_name}-tg"
    port = 80
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id

    health_check {
        path = "/"
        interval = 30
        timeout = 5
        healthy_threshold = 2
        unhealthy_threshold = 2
        matcher = "200"
    }

    tags = {
        Name = "${var.project_name}-tg"
    }
}

resource "aws_lb_listener" "http" {
    load_balancer_arn = aws_lb.main_lb.arn
    port = 80
    protocol = "HTTP"

    default_action {
      type = "forward"
      target_group_arn = aws_alb_target_group.app.arn
    }
}