import {
  formatCurrency,
  calculateProfitability,
  validateNumber,
  calculateGrowth,
} from '../src/utils/helpers';

describe('Utility Helpers', () => {
  describe('formatCurrency', () => {
    test('should format currency with Euro symbol', () => {
      expect(formatCurrency(1000)).toBe('1,000.00 €');
    });

    test('should format currency with custom symbol', () => {
      expect(formatCurrency(500, '$')).toBe('500.00 $');
    });

    test('should handle decimal values', () => {
      expect(formatCurrency(1234.56)).toBe('1,234.56 €');
    });
  });

  describe('calculateProfitability', () => {
    test('should calculate profitability correctly', () => {
      expect(calculateProfitability(1000, 500)).toBe(100);
    });

    test('should handle zero investment', () => {
      expect(calculateProfitability(1000, 0)).toBe(100);
    });

    test('should calculate negative profitability', () => {
      expect(calculateProfitability(500, 1000)).toBe(-50);
    });
  });

  describe('validateNumber', () => {
    test('should validate positive numbers', () => {
      expect(validateNumber('100')).toBe(true);
      expect(validateNumber('0')).toBe(true);
    });

    test('should reject invalid numbers', () => {
      expect(validateNumber('abc')).toBe(false);
      expect(validateNumber('')).toBe(false);
    });

    test('should reject negative numbers', () => {
      expect(validateNumber('-100')).toBe(false);
    });
  });

  describe('calculateGrowth', () => {
    test('should calculate positive growth', () => {
      expect(calculateGrowth(150, 100)).toBe(50);
    });

    test('should calculate negative growth', () => {
      expect(calculateGrowth(75, 100)).toBe(-25);
    });

    test('should handle zero previous value', () => {
      expect(calculateGrowth(100, 0)).toBe(100);
    });
  });
});
