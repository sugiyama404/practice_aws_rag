resource "aws_cloudwatch_log_group" "kendra" {
  name = "/aws/kendra/${var.app_name}"
}
