resource "null_resource" "default" {
  provisioner "local-exec" {
    command = "aws s3 sync ../document/ s3://${var.s3_bucket_id}"
  }
}
