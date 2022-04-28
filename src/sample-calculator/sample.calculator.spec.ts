import { SampleCalculator } from './sample.calculator';

describe('Calculator test', () => {
  it('add test', () => {
    const result = SampleCalculator.add(1, 1);
    expect(result).toEqual(2);
  });
});
