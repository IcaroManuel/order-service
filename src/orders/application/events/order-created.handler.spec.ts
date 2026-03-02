import { OrderCreatedHandler } from './order-created.handler';
import { SnsEventPublisher } from '../../infrastructure/messaging/sns-event-publisher';
import { OrderCreatedEvent } from '../../domain/events/order-created.event';

describe('OrderCreatedHandler', () => {
  let handler: OrderCreatedHandler;
  let publisher: SnsEventPublisher;

  beforeEach(() => {
    const mockPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    publisher = mockPublisher as unknown as jest.Mocked<SnsEventPublisher>;
    handler = new OrderCreatedHandler(publisher);
  });

  it('Should be call a publisher SNS when created a new order', async () => {
    const event = new OrderCreatedEvent('ord-123', 'cust-456', 500);
    await handler.handle(event);

    expect(publisher['publish']).toHaveBeenCalledTimes(1);
    expect(publisher['publish']).toHaveBeenCalledWith(event);
  });

  it('Should be throw error if SNS request failed', async () => {
    jest.spyOn(publisher, 'publish').mockRejectedValue(new Error('AWS Error'));

    const event = new OrderCreatedEvent('order-123', 'cust-345', 500);
    await expect(handler.handle(event)).rejects.toThrow('AWS Error');
  });
});
