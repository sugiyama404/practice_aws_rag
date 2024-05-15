resource "aws_kendra_index" "main" {
  name        = "${var.app_name}-main"
  description = "example"
  edition     = "DEVELOPER_EDITION"
  role_arn    = var.iam_role_kendra
  depends_on  = [aws_cloudwatch_log_group.kendra]
  tags = {
    Name = "${var.app_name}-main-kendra"
  }
}
