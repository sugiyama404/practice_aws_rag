resource "aws_kendra_data_source" "main" {
  index_id      = aws_kendra_index.main.id
  name          = "${var.app_name}-s3-datasource"
  type          = "S3"
  role_arn      = var.iam_role_kendra
  depends_on    = [aws_cloudwatch_log_group.kendra]
  language_code = "ja"
  configuration {
    s3_configuration {
      bucket_name = var.s3_bucket_name
    }
  }
}
