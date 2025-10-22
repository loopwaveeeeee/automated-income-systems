import {
  formatCurrency,
  formatDate,
  formatDateTime,
  calculatePercentage,
  validateEmail,
  generateId,
} from '../src/utils/helpers';

describe('helpers', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1,234.56');
      expect(result).toContain('$');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toContain('0');
    });

    it('should handle negative values', () => {
      const result = formatCurrency(-100);
      expect(result).toContain('100');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-01-15');
      const result = formatDate(date);
      expect(result).toContain('2025');
      expect(result).toContain('Jan');
    });

    it('should handle string dates', () => {
      const result = formatDate('2025-01-15');
      expect(result).toContain('2025');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time correctly', () => {
      const date = new Date('2025-01-15T14:30:00');
      const result = formatDateTime(date);
      expect(result).toContain('2025');
      expect(result).toContain(':');
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      const result = calculatePercentage(25, 100);
      expect(result).toBe(25);
    });

    it('should handle zero total', () => {
      const result = calculatePercentage(10, 0);
      expect(result).toBe(0);
    });

    it('should calculate partial percentages', () => {
      const result = calculatePercentage(1, 3);
      expect(result).toBeCloseTo(33.33, 1);
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test @example.com')).toBe(false);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    it('should generate string IDs', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });
});
