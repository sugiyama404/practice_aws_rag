# Bedrock動作用のポリシー
resource "aws_iam_policy" "bedrock" {
  name = "BedrockAccessPolicy"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "bedrock:*",
        "Resource" : "*"
      }
    ]
  })
}
# Kendraのデータ読み取り用のポリシー
resource "aws_iam_policy" "lambda_to_kendra" {
  name = "LambdaToKendraPolicy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "AllowKendraRetrieve",
        "Effect" : "Allow",
        "Action" : "kendra:Retrieve",
        "Resource" : "${var.kendra_index_arn}"
      }
    ]
  })
}

# S3データソース用のポリシー
resource "aws_iam_policy" "kendra_policy" {
  name = "${var.app_name}-kendra-policy"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "s3:GetObject"
        ],
        "Resource" : [
          "arn:aws:s3:::${var.s3_bucket_name}/*"
        ],
        "Effect" : "Allow"
      },
      {
        "Action" : [
          "s3:ListBucket"
        ],
        "Resource" : [
          "arn:aws:s3:::${var.s3_bucket_name}"
        ],
        "Effect" : "Allow"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kendra:BatchPutDocument",
          "kendra:BatchDeleteDocument"
        ],
        "Resource" : "${var.kendra_index_arn}"
      }
    ]
  })
}
# Amazon Kendra に CloudWatch ログへのアクセスを許可するロールポリシー
resource "aws_iam_policy" "cloudwatch_policy" {
  name = "${var.app_name}-cloudwatch-policy"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "cloudwatch:PutMetricData",
        "Resource" : "*",
        "Condition" : {
          "StringEquals" : {
            "cloudwatch:namespace" : "AWS/Kendra"
          }
        }
      },
      {
        "Effect" : "Allow",
        "Action" : "logs:DescribeLogGroups",
        "Resource" : "*"
      },
      {
        "Effect" : "Allow",
        "Action" : "logs:CreateLogGroup",
        "Resource" : "arn:aws:logs:${var.region}:${local.account_id}:log-group:/aws/kendra/*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "logs:DescribeLogStreams",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : "arn:aws:logs:${var.region}:${local.account_id}:log-group:/aws/kendra/*:log-stream:*"
      }
    ]
  })
}



