import { describe, expect, it, test } from 'vitest';
import { calculateEndTime } from '../../app/business/appointments';

describe('Testing appointments', () => {
  describe('calculateEndTime()', () => {
    test('should return 11:00 when startTime = 10:00 and duration = 60', () => {
      const startTime = '10:00';
      const duration = 60;
      const endTime = calculateEndTime(startTime, duration);
      expect(endTime).toBe('11:00');
    });

    test('should return 10:30 when startTime = 10:00 and duration = 30', () => {
      const startTime = '10:00';
      const duration = 30;
      const endTime = calculateEndTime(startTime, duration);
      expect(endTime).toBe('10:30');
    });

    test('should return 11:30 when startTime = 10:00 and duration = 90', () => {
      const startTime = '10:00';
      const duration = 90;
      const endTime = calculateEndTime(startTime, duration);
      expect(endTime).toBe('11:30');
    });

    test('should return 11:15 when startTime = 10:00 and duration = 75', () => {
      const startTime = '10:00';
      const duration = 75;
      const endTime = calculateEndTime(startTime, duration);
      expect(endTime).toBe('11:15');
    });

    test('should return 10:45 when startTime = 10:00 and duration = 45', () => {
      const startTime = '10:00';
      const duration = 45;
      const endTime = calculateEndTime(startTime, duration);
      expect(endTime).toBe('10:45');
    });

    test('should return 10:15 when startTime = 10:00 and duration = 15', () => {
      const startTime = '10:00';
      const duration = 15;
      const endTime = calculateEndTime(startTime, duration);
      expect(endTime).toBe('10:15');
    });
  });
});
