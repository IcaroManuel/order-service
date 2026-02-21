import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/orders/domain/order-repository.interface';
import { Order, OrderItem } from 'src/orders/domain/order.entity';

@Injectable()
export class DynamoOrderRepository implements IOrderRepository {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName = 'OrdersTable';

  constructor() {
    const client = new DynamoDBClient({ region: 'us-east-1' });
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async save(order: Order): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        PK: `ORDER#${order.id}`,
        SK: `METADATA#${order.id}`,
        id: order.id,
        customerId: order.customerId,
        status: order.status,
        total: order.calculateTotal(),
        createdAt: order.createdAt.toISOString(),
        items: order.items,
      },
    });

    await this.docClient.send(command);
  }

  async findById(id: string): Promise<Order> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        PK: `ORDER#${id}`,
        SK: `METADATA#${id}`,
      },
    });

    const { Item } = await this.docClient.send(command);
    if (!Item) throw new Error(`Order with id ${id} not found`);

    return new Order(
      Item.id as string,
      Item.customerId as string,
      Item.items as OrderItem[],
      Item.status as 'PENDING' | 'PAID' | 'CANCELLED',
      new Date(Item.createdAt as Date),
    );
  }
}
