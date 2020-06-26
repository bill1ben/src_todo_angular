import { OrderByPriorityPipe } from './order-by-priority.pipe';

describe('OrderByPriorityPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByPriorityPipe();
    expect(pipe).toBeTruthy();
  });
});
