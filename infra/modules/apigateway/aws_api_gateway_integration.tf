resource "aws_api_gateway_integration" "MyIntergration" {
  rest_api_id             = aws_api_gateway_rest_api.main.id
  resource_id             = aws_api_gateway_rest_api.main.root_resource_id
  http_method             = aws_api_gateway_method.MyMethod.http_method
  type                    = "AWS_PROXY"
  cache_namespace         = aws_api_gateway_rest_api.main.root_resource_id
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  passthrough_behavior    = "WHEN_NO_MATCH"
  uri                     = var.lambda_invoke_arn
}

