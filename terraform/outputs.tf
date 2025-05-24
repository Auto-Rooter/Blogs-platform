output "load_balancer_dns" {
  description = "Public DNS of the application Load balancer"
  value = aws_alb.main_lb.dns_name
}