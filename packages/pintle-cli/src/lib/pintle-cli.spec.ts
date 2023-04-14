import { pintleCli } from './pintle-cli';

describe('pintleCli', () => {
  it('should work', () => {
    expect(pintleCli()).toEqual('pintle-cli');
  });
});
