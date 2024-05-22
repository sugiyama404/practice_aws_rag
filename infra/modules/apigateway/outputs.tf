output "api_execution_arn" {
  value = aws_api_gateway_rest_api.main.execution_arn
}

output "api_gateway_endpoint" {
  value = "https://${aws_api_gateway_rest_api.main.id}-${var.api_gateway_endpoint_id}.execute-api.ap-northeast-1.amazonaws.com/stage"
}
