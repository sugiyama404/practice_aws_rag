resource "aws_api_gateway_deployment" "main" {
  rest_api_id = aws_api_gateway_rest_api.main.id

  stage_name = "stage"

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.main.body))
  }

  depends_on = [aws_api_gateway_method.MyMethod, aws_api_gateway_integration.MyIntergration]

  lifecycle {
    create_before_destroy = true
  }
}
