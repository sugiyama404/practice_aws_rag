output "s3_bucket_name" {
  value = aws_s3_bucket.main.bucket
}

output "s3_bucket_id" {
  value = aws_s3_bucket.main.id
}
