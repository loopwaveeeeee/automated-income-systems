/**
 * Income Tracking Service
 * Handles income data tracking and storage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@income_tracking_data';

class IncomeTracker {
  constructor() {
    this.incomeData = [];
  }

  /**
   * Initialize tracker and load saved data
   */
  async initialize() {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        this.incomeData = JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading income data:', error);
    }
  }

  /**
   * Add new income entry
   * @param {Object} entry - Income entry
   */
  async addIncomeEntry(entry) {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...entry,
    };

    this.incomeData.push(newEntry);
    await this.save();
    return newEntry;
  }

  /**
   * Get all income entries
   * @returns {Array} All income entries
   */
  getAllEntries() {
    return [...this.incomeData];
  }

  /**
   * Get income entries for a specific period
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Array} Filtered income entries
   */
  getEntriesByPeriod(startDate, endDate) {
    return this.incomeData.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }

  /**
   * Calculate total income for a period
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {number} Total income
   */
  calculateTotalIncome(startDate, endDate) {
    const entries = this.getEntriesByPeriod(startDate, endDate);
    return entries.reduce((total, entry) => total + (entry.amount || 0), 0);
  }

  /**
   * Get income statistics
   * @returns {Object} Income statistics
   */
  getStatistics() {
    if (this.incomeData.length === 0) {
      return {
        total: 0,
        average: 0,
        count: 0,
        lastEntry: null,
      };
    }

    const total = this.incomeData.reduce((sum, entry) => sum + (entry.amount || 0), 0);
    const average = total / this.incomeData.length;
    const lastEntry = this.incomeData[this.incomeData.length - 1];

    return {
      total,
      average,
      count: this.incomeData.length,
      lastEntry,
    };
  }

  /**
   * Clear all income data
   */
  async clearAll() {
    this.incomeData = [];
    await this.save();
  }

  /**
   * Save data to storage
   */
  async save() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.incomeData));
    } catch (error) {
      console.error('Error saving income data:', error);
    }
  }
}

export default IncomeTracker;
