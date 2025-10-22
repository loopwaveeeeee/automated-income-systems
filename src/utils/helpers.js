// Formatiert einen Geldbetrag
export const formatCurrency = (amount, currency = '€') => {
  return `${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${currency}`;
};

// Berechnet die Rentabilität in Prozent
export const calculateProfitability = (income, investment) => {
  if (investment === 0) return 100;
  return ((income - investment) / investment) * 100;
};

// Generiert eine eindeutige ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Validiert Eingaben
export const validateNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

// Formatiert Datum
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Berechnet das Wachstum in Prozent
export const calculateGrowth = (current, previous) => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};
