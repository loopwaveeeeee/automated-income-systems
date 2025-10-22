// Konfiguration für maximales Einkommen
export const INCOME_CONFIG = {
  // Maximale Einkommensquellen, die gleichzeitig aktiv sein können
  maxActiveSources: 10,
  
  // Optimierungsintervall (in Millisekunden)
  optimizationInterval: 3600000, // 1 Stunde
  
  // Minimale Rentabilität für eine Einkommensquelle (in %)
  minProfitability: 5,
  
  // Automatische Optimierung aktiviert
  autoOptimization: true,
  
  // Benachrichtigungen für neue Möglichkeiten
  notifications: true,
};

// Setup-Sequenz Konfiguration
export const SETUP_SEQUENCE = [
  {
    id: 1,
    title: 'Profil erstellen',
    description: 'Erstellen Sie Ihr Einkommensprofil',
    automated: true,
  },
  {
    id: 2,
    title: 'Quellen analysieren',
    description: 'Analyse möglicher Einkommensquellen',
    automated: true,
  },
  {
    id: 3,
    title: 'Optimierung planen',
    description: 'Erstellen eines Optimierungsplans',
    automated: true,
  },
  {
    id: 4,
    title: 'Automatisierung aktivieren',
    description: 'Aktivierung der vollständigen Automatisierung',
    automated: true,
  },
];

// Einkommensquellen-Typen
export const INCOME_SOURCE_TYPES = [
  'Passives Einkommen',
  'Aktives Einkommen',
  'Investitionen',
  'Dividenden',
  'Lizenzgebühren',
  'Affiliate Marketing',
  'Online-Geschäft',
  'Vermietung',
];
