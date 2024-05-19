# ecs
resource "aws_iam_policy_attachment" "ecr_attach" {
  name       = "${var.app_name}_ecr_attach"
  roles      = ["${aws_iam_role.ecs_role.name}"]
  policy_arn = aws_iam_policy.ecr_policy.arn
}

resource "aws_iam_policy_attachment" "cloudwatch_attach" {
  name       = "${var.app_name}_cloudwatch_attach"
  roles      = ["${aws_iam_role.ecs_role.name}"]
  policy_arn = aws_iam_policy.cloudwatch_policy.arn
}
