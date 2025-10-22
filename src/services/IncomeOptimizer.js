/**
 * Income Optimization Service
 * Provides automated income optimization algorithms
 */

class IncomeOptimizer {
  constructor(config) {
    this.config = config;
    this.optimizationHistory = [];
  }

  /**
   * Analyze current income patterns
   * @param {Object} incomeData - Current income data
   * @returns {Object} Analysis results
   */
  analyzeIncomePatterns(incomeData) {
    const analysis = {
      averageIncome: this.calculateAverage(incomeData),
      trend: this.calculateTrend(incomeData),
      volatility: this.calculateVolatility(incomeData),
      recommendations: [],
    };

    // Generate recommendations based on analysis
    if (analysis.volatility > 0.3) {
      analysis.recommendations.push({
        type: 'diversification',
        message: 'Consider diversifying income sources to reduce volatility',
        priority: 'high',
      });
    }

    if (analysis.trend < 0) {
      analysis.recommendations.push({
        type: 'optimization',
        message: 'Income trend is negative, optimization recommended',
        priority: 'high',
      });
    }

    return analysis;
  }

  /**
   * Calculate optimization opportunities
   * @param {Object} currentSetup - Current income setup
   * @returns {Array} List of optimization opportunities
   */
  calculateOptimizations(currentSetup) {
    const opportunities = [];

    // Check if auto-optimization is enabled
    if (!currentSetup.auto_optimize) {
      opportunities.push({
        type: 'config',
        title: 'Enable Auto-Optimization',
        description: 'Automatic optimization can increase income by 15-25%',
        impact: 'high',
      });
    }

    // Check optimization frequency
    if (currentSetup.optimization_frequency === 'Monthly') {
      opportunities.push({
        type: 'frequency',
        title: 'Increase Optimization Frequency',
        description: 'Weekly optimization can catch more opportunities',
        impact: 'medium',
      });
    }

    // Check income goal vs actual
    if (currentSetup.current_income < currentSetup.income_goal * 0.8) {
      opportunities.push({
        type: 'goal',
        title: 'Income Below Target',
        description: 'Adjust strategy to reach income goal',
        impact: 'high',
      });
    }

    return opportunities;
  }

  /**
   * Apply optimization to maximize income
   * @param {Object} setup - Current setup configuration
   * @returns {Object} Optimized setup
   */
  optimize(setup) {
    const optimized = { ...setup };
    const timestamp = new Date().toISOString();

    // Apply optimization rules
    if (!optimized.auto_optimize) {
      optimized.auto_optimize = true;
    }

    if (optimized.optimization_frequency === 'Monthly') {
      optimized.optimization_frequency = 'Weekly';
    }

    // Track optimization
    this.optimizationHistory.push({
      timestamp,
      before: setup,
      after: optimized,
    });

    return optimized;
  }

  /**
   * Calculate average income
   * @param {Array} incomeData - Income data array
   * @returns {number} Average income
   */
  calculateAverage(incomeData) {
    if (!incomeData || incomeData.length === 0) return 0;
    const sum = incomeData.reduce((acc, item) => acc + item.amount, 0);
    return sum / incomeData.length;
  }

  /**
   * Calculate income trend
   * @param {Array} incomeData - Income data array
   * @returns {number} Trend value (-1 to 1)
   */
  calculateTrend(incomeData) {
    if (!incomeData || incomeData.length < 2) return 0;
    
    const recent = incomeData.slice(-5);
    const older = incomeData.slice(0, Math.min(5, incomeData.length - 5));
    
    const recentAvg = this.calculateAverage(recent);
    const olderAvg = this.calculateAverage(older);
    
    if (olderAvg === 0) return 0;
    return (recentAvg - olderAvg) / olderAvg;
  }

  /**
   * Calculate income volatility
   * @param {Array} incomeData - Income data array
   * @returns {number} Volatility coefficient
   */
  calculateVolatility(incomeData) {
    if (!incomeData || incomeData.length < 2) return 0;
    
    const avg = this.calculateAverage(incomeData);
    const squaredDiffs = incomeData.map(item => Math.pow(item.amount - avg, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / incomeData.length;
    const stdDev = Math.sqrt(variance);
    
    return avg === 0 ? 0 : stdDev / avg;
  }

  /**
   * Get optimization history
   * @returns {Array} Optimization history
   */
  getHistory() {
    return this.optimizationHistory;
  }
}

export default IncomeOptimizer;
