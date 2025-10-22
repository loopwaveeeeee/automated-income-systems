import AutomationService from '../src/services/AutomationService';
import {INCOME_CONFIG, SETUP_SEQUENCE} from '../src/config/incomeConfig';

describe('AutomationService', () => {
  beforeEach(() => {
    // Reset service before each test
    AutomationService.stopAutomation();
    AutomationService.incomeSources = [];
  });

  test('should start automation', () => {
    AutomationService.startAutomation();
    const status = AutomationService.getStatus();
    expect(status.isRunning).toBe(true);
  });

  test('should stop automation', () => {
    AutomationService.startAutomation();
    AutomationService.stopAutomation();
    const status = AutomationService.getStatus();
    expect(status.isRunning).toBe(false);
  });

  test('should add income source', () => {
    const source = {
      name: 'Test Source',
      type: 'Passives Einkommen',
      amount: 1000,
      investment: 500,
      profitability: 100,
    };
    
    AutomationService.addIncomeSource(source);
    const sources = AutomationService.getIncomeSources();
    expect(sources.length).toBe(1);
    expect(sources[0].name).toBe('Test Source');
  });

  test('should calculate max income', () => {
    AutomationService.addIncomeSource({
      name: 'Source 1',
      amount: 500,
      profitability: 50,
    });
    AutomationService.addIncomeSource({
      name: 'Source 2',
      amount: 300,
      profitability: 30,
    });
    
    const maxIncome = AutomationService.calculateMaxIncome();
    expect(maxIncome).toBe(800);
  });

  test('should optimize income by removing unprofitable sources', () => {
    // Add profitable source
    AutomationService.addIncomeSource({
      name: 'Profitable',
      amount: 1000,
      profitability: 50,
    });
    
    // Add unprofitable source
    AutomationService.addIncomeSource({
      name: 'Unprofitable',
      amount: 100,
      profitability: 3, // Below minimum 5%
    });
    
    AutomationService.optimizeIncome();
    const sources = AutomationService.getIncomeSources();
    
    expect(sources.length).toBe(1);
    expect(sources[0].name).toBe('Profitable');
  });

  test('should limit to max active sources', () => {
    // Add more than max allowed sources
    for (let i = 0; i < 15; i++) {
      AutomationService.addIncomeSource({
        name: `Source ${i}`,
        amount: 100 + i * 10,
        profitability: 10 + i,
      });
    }
    
    AutomationService.optimizeIncome();
    const sources = AutomationService.getIncomeSources();
    
    expect(sources.length).toBeLessThanOrEqual(INCOME_CONFIG.maxActiveSources);
  });

  test('should run setup sequence', async () => {
    const steps = [];
    await AutomationService.runSetupSequence((step, current, total) => {
      steps.push(step);
    });
    
    expect(steps.length).toBe(SETUP_SEQUENCE.length);
  });
});
