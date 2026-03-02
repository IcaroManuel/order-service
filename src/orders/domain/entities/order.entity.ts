import { randomUUID } from 'crypto';

export interface OrderItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}
export class Order {
  public readonly totalPrice: number;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly status: 'PENDING' | 'PAID' | 'CANCELLED',
    public readonly createdAt: Date,
  ) {
    this.totalPrice = this.calculateTotal();
    if (this.totalPrice < 0) {
      throw new Error('Total price cannot be negative');
    }
  }

  public calculateTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  static create(customerId: string, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error('A order require items');
    return new Order(randomUUID(), customerId, items, 'PENDING', new Date());
  }
}
