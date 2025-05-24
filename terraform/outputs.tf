output "load_balancer_dns" {
  description = "Public DNS of the application Load balancer"
  value       = aws_lb.main_lb.dns_name
}