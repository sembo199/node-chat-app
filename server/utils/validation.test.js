const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(12)).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    expect(isRealString('  ')).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    expect(isRealString('Sem')).toBe(true);
  });
});
