output "iam_role_lambda" {
  value = aws_iam_role.main_role.arn
}

output "iam_role_kendra" {
  value = aws_iam_role.kendra_role.arn
}
