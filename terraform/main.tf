provider "aws" {
    region = "us-east-1"
}

resource "aws_dynamodb_table" "orders_table" {
    name = "OrdersTable"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "PK"
    range_key = "SK"

    attribute {
        name = "PK"
        type = "S"
    }

    attribute {
        name = "SK"
        type = "S"
    }

    tags = {
        Project = "OrderService"
        Owner   = "IcaroFernandes"
    }
}

resource "aws_sns_topic" "order_events" {
    name = "order-created-topic"
}

resource "aws_sqs_queue" "payment_processinig_queue" {
  name = "payment-processing-queue"

  message_retention_seconds = 86400
}

resource "aws_sns_topic_subscription" "order_to_pay" {
  topic_arn = aws_sns_topic.order_events.arn
  protocol = "sqs"
  endpoint = aws_sqs_queue.payment_processinig_queue.arn
}

output "sns_topic_arn" {
  value       = aws_sns_topic.order_events.arn
  description = "O ARN do tópico SNS para colocar no .env do NestJS"
}
