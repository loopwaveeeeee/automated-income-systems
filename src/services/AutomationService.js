import AsyncStorage from '@react-native-async-storage/async-storage';
import {INCOME_CONFIG, SETUP_SEQUENCE} from '../config/incomeConfig';

const STORAGE_KEY = '@income_sources';

class AutomationService {
  constructor() {
    this.incomeSources = [];
    this.optimizationTimer = null;
    this.isRunning = false;
    this.loadIncomeSources();
  }

  // Lädt Einkommensquellen aus AsyncStorage
  async loadIncomeSources() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        this.incomeSources = JSON.parse(stored);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Fehler beim Laden der Einkommensquellen:', error);
      }
    }
  }

  // Speichert Einkommensquellen in AsyncStorage
  async saveIncomeSources() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.incomeSources));
    } catch (error) {
      if (__DEV__) {
        console.error('Fehler beim Speichern der Einkommensquellen:', error);
      }
    }
  }

  // Startet die vollständige Automatisierung
  startAutomation() {
    if (this.isRunning) {
      if (__DEV__) {
        console.log('Automatisierung läuft bereits');
      }
      return;
    }

    this.isRunning = true;
    if (__DEV__) {
      console.log('Automatisierung gestartet');
    }

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
    if (__DEV__) {
      console.log('Automatisierung gestoppt');
    }
  }

  // Bereinigt Ressourcen (z.B. bei App-Beendigung oder Unmount)
  cleanup() {
    if (this.optimizationTimer) {
      clearInterval(this.optimizationTimer);
      this.optimizationTimer = null;
    }
    this.isRunning = false;
  }

  // Führt die Setup-Sequenz automatisch durch
  async runSetupSequence(onProgress) {
    for (let i = 0; i < SETUP_SEQUENCE.length; i++) {
      const step = SETUP_SEQUENCE[i];
      if (__DEV__) {
        console.log(`Führe Schritt ${step.id} aus: ${step.title}`);
      }

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
    if (__DEV__) {
      console.log('Optimiere Einkommensquellen...');
    }

    // Sortiere Quellen nach Rentabilität
    this.incomeSources.sort((a, b) => b.profitability - a.profitability);

    // Entferne unrentable Quellen
    this.incomeSources = this.incomeSources.filter(
      source => source.profitability >= INCOME_CONFIG.minProfitability,
    );

    // Begrenze auf maximale Anzahl aktiver Quellen
    if (this.incomeSources.length > INCOME_CONFIG.maxActiveSources) {
      this.incomeSources = this.incomeSources.slice(
        0,
        INCOME_CONFIG.maxActiveSources,
      );
    }

    this.saveIncomeSources();

    if (__DEV__) {
      console.log(`Aktive Einkommensquellen: ${this.incomeSources.length}`);
    }
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

    this.saveIncomeSources();

    // Optimiere nach Hinzufügen
    if (INCOME_CONFIG.autoOptimization) {
      this.optimizeIncome();
    }
  }

  // Entfernt eine Einkommensquelle
  removeIncomeSource(id) {
    this.incomeSources = this.incomeSources.filter(source => source.id !== id);
    this.saveIncomeSources();
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
