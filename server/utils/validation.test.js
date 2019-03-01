const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should return false for invalid string', () => {
    expect(isRealString('')).toBe(false);
    expect(isRealString('   ')).toBe(false);
    expect(isRealString(1)).toBe(false);
    expect(isRealString('Test')).toBe(true);
    expect(isRealString('   Test   ')).toBe(true);
  });
});