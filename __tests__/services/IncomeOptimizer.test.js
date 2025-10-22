import IncomeOptimizer from '../src/services/IncomeOptimizer';

describe('IncomeOptimizer', () => {
  let optimizer;
  const mockConfig = {
    income_goal: 5000,
    risk_level: 'Medium',
    auto_optimize: true,
    optimization_frequency: 'Weekly',
  };

  beforeEach(() => {
    optimizer = new IncomeOptimizer(mockConfig);
  });

  describe('calculateAverage', () => {
    it('should calculate average income correctly', () => {
      const incomeData = [
        { amount: 100 },
        { amount: 200 },
        { amount: 300 },
      ];
      const average = optimizer.calculateAverage(incomeData);
      expect(average).toBe(200);
    });

    it('should return 0 for empty array', () => {
      const average = optimizer.calculateAverage([]);
      expect(average).toBe(0);
    });
  });

  describe('calculateTrend', () => {
    it('should calculate positive trend', () => {
      const incomeData = [
        { amount: 100 },
        { amount: 150 },
        { amount: 200 },
        { amount: 250 },
        { amount: 300 },
        { amount: 350 },
      ];
      const trend = optimizer.calculateTrend(incomeData);
      expect(trend).toBeGreaterThan(0);
    });

    it('should calculate negative trend', () => {
      const incomeData = [
        { amount: 300 },
        { amount: 250 },
        { amount: 200 },
        { amount: 150 },
        { amount: 100 },
        { amount: 50 },
      ];
      const trend = optimizer.calculateTrend(incomeData);
      expect(trend).toBeLessThan(0);
    });

    it('should return 0 for insufficient data', () => {
      const trend = optimizer.calculateTrend([{ amount: 100 }]);
      expect(trend).toBe(0);
    });
  });

  describe('calculateVolatility', () => {
    it('should calculate volatility correctly', () => {
      const incomeData = [
        { amount: 100 },
        { amount: 500 },
        { amount: 100 },
        { amount: 500 },
      ];
      const volatility = optimizer.calculateVolatility(incomeData);
      expect(volatility).toBeGreaterThan(0);
    });

    it('should return 0 for consistent income', () => {
      const incomeData = [
        { amount: 200 },
        { amount: 200 },
        { amount: 200 },
      ];
      const volatility = optimizer.calculateVolatility(incomeData);
      expect(volatility).toBe(0);
    });
  });

  describe('analyzeIncomePatterns', () => {
    it('should provide analysis with recommendations', () => {
      const incomeData = [
        { amount: 100 },
        { amount: 500 },
        { amount: 100 },
        { amount: 500 },
        { amount: 100 },
      ];
      const analysis = optimizer.analyzeIncomePatterns(incomeData);
      
      expect(analysis).toHaveProperty('averageIncome');
      expect(analysis).toHaveProperty('trend');
      expect(analysis).toHaveProperty('volatility');
      expect(analysis).toHaveProperty('recommendations');
      expect(Array.isArray(analysis.recommendations)).toBe(true);
    });

    it('should recommend diversification for high volatility', () => {
      const incomeData = [
        { amount: 100 },
        { amount: 1000 },
        { amount: 100 },
        { amount: 1000 },
      ];
      const analysis = optimizer.analyzeIncomePatterns(incomeData);
      
      const diversificationRec = analysis.recommendations.find(
        rec => rec.type === 'diversification'
      );
      expect(diversificationRec).toBeDefined();
    });
  });

  describe('calculateOptimizations', () => {
    it('should identify optimization opportunities', () => {
      const currentSetup = {
        auto_optimize: false,
        optimization_frequency: 'Monthly',
        income_goal: 5000,
        current_income: 3000,
      };
      
      const opportunities = optimizer.calculateOptimizations(currentSetup);
      expect(Array.isArray(opportunities)).toBe(true);
      expect(opportunities.length).toBeGreaterThan(0);
    });

    it('should suggest enabling auto-optimization', () => {
      const currentSetup = {
        auto_optimize: false,
        optimization_frequency: 'Weekly',
        income_goal: 5000,
        current_income: 4500,
      };
      
      const opportunities = optimizer.calculateOptimizations(currentSetup);
      const autoOptRec = opportunities.find(opp => opp.type === 'config');
      expect(autoOptRec).toBeDefined();
    });
  });

  describe('optimize', () => {
    it('should optimize setup configuration', () => {
      const setup = {
        auto_optimize: false,
        optimization_frequency: 'Monthly',
      };
      
      const optimized = optimizer.optimize(setup);
      expect(optimized.auto_optimize).toBe(true);
      expect(optimized.optimization_frequency).toBe('Weekly');
    });

    it('should track optimization history', () => {
      const setup = {
        auto_optimize: false,
        optimization_frequency: 'Monthly',
      };
      
      optimizer.optimize(setup);
      const history = optimizer.getHistory();
      
      expect(history.length).toBe(1);
      expect(history[0]).toHaveProperty('timestamp');
      expect(history[0]).toHaveProperty('before');
      expect(history[0]).toHaveProperty('after');
    });
  });
});
