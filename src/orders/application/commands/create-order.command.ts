import { OrderItem } from 'src/orders/domain/order.entity';

export class CreateOrderCommand {
  constructor(
    public readonly customerId: string,
    public readonly items: OrderItem[],
  ) {}
}
