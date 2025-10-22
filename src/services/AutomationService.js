import {INCOME_CONFIG, SETUP_SEQUENCE} from '../config/incomeConfig';

class AutomationService {
  constructor() {
    this.incomeSources = [];
    this.optimizationTimer = null;
    this.isRunning = false;
  }

  // Startet die vollständige Automatisierung
  startAutomation() {
    if (this.isRunning) {
      console.log('Automatisierung läuft bereits');
      return;
    }

    this.isRunning = true;
    console.log('Automatisierung gestartet');

    // Automatische Optimierung in regelmäßigen Abständen
    if (INCOME_CONFIG.autoOptimization) {
      this.optimizationTimer = setInterval(() => {
        this.optimizeIncome();
      }, INCOME_CONFIG.optimizationInterval);
    }
  }

  // Stoppt die Automatisierung
  stopAutomation() {
    if (this.optimizationTimer) {
      clearInterval(this.optimizationTimer);
      this.optimizationTimer = null;
    }
    this.isRunning = false;
    console.log('Automatisierung gestoppt');
  }

  // Führt die Setup-Sequenz automatisch durch
  async runSetupSequence(onProgress) {
    for (let i = 0; i < SETUP_SEQUENCE.length; i++) {
      const step = SETUP_SEQUENCE[i];
      console.log(`Führe Schritt ${step.id} aus: ${step.title}`);
      
      // Simuliere Verarbeitung
      await this.delay(1000);
      
      if (onProgress) {
        onProgress(step, i + 1, SETUP_SEQUENCE.length);
      }
    }
    
    return true;
  }

  // Optimiert Einkommensquellen automatisch
  optimizeIncome() {
    console.log('Optimiere Einkommensquellen...');
    
    // Sortiere Quellen nach Rentabilität
    this.incomeSources.sort((a, b) => b.profitability - a.profitability);
    
    // Entferne unrentable Quellen
    this.incomeSources = this.incomeSources.filter(
      source => source.profitability >= INCOME_CONFIG.minProfitability
    );
    
    // Begrenze auf maximale Anzahl aktiver Quellen
    if (this.incomeSources.length > INCOME_CONFIG.maxActiveSources) {
      this.incomeSources = this.incomeSources.slice(0, INCOME_CONFIG.maxActiveSources);
    }
    
    console.log(`Aktive Einkommensquellen: ${this.incomeSources.length}`);
    return this.incomeSources;
  }

  // Berechnet das maximale Einkommen
  calculateMaxIncome() {
    return this.incomeSources.reduce((total, source) => {
      return total + source.amount;
    }, 0);
  }

  // Fügt eine neue Einkommensquelle hinzu
  addIncomeSource(source) {
    this.incomeSources.push({
      ...source,
      id: Date.now(),
      createdAt: new Date(),
    });
    
    // Optimiere nach Hinzufügen
    if (INCOME_CONFIG.autoOptimization) {
      this.optimizeIncome();
    }
  }

  // Hilfsfunktion für Verzögerung
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Gibt alle aktiven Einkommensquellen zurück
  getIncomeSources() {
    return this.incomeSources;
  }

  // Status der Automatisierung
  getStatus() {
    return {
      isRunning: this.isRunning,
      activeSources: this.incomeSources.length,
      totalIncome: this.calculateMaxIncome(),
    };
  }
}

export default new AutomationService();
