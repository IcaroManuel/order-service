import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from 'src/orders/domain/events/order-created.event';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class SnsEventPublisher {
  private readonly snsClient: SNSClient;

  constructor() {
    const region = process.env.ORDER_SNS_REGION || 'us-east-1';
    this.snsClient = new SNSClient({
      region,
    });
  }

  async publish(event: OrderCreatedEvent) {
    const command = new PublishCommand({
      TopicArn: process.env.ORDER_SNS_TOPIC_ARN,
      Message: JSON.stringify(event),
      MessageAttributes: {
        eventType: { DataType: 'String', StringValue: 'OrderCreated' },
      },
    });

    try {
      await this.snsClient.send(command);
      console.log('✅ Evend successfully sent to SNS!');
    } catch (error) {
      console.log('❌ Error in send to SNS!', error);
    }
  }
}
