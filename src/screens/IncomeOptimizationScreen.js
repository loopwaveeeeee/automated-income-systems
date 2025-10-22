import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import AutomationService from '../services/AutomationService';
import {INCOME_SOURCE_TYPES} from '../config/incomeConfig';
import {formatCurrency, calculateProfitability} from '../utils/helpers';

const IncomeOptimizationScreen = ({navigation}) => {
  const [incomeSources, setIncomeSources] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: INCOME_SOURCE_TYPES[0],
    amount: '',
    investment: '',
  });

  useEffect(() => {
    loadIncomeSources();
  }, []);

  const loadIncomeSources = () => {
    const sources = AutomationService.getIncomeSources();
    setIncomeSources(sources);
  };

  const addIncomeSource = () => {
    if (!newSource.name || !newSource.amount) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    const amount = parseFloat(newSource.amount);
    const investment = parseFloat(newSource.investment || 0);

    AutomationService.addIncomeSource({
      name: newSource.name,
      type: newSource.type,
      amount: amount,
      investment: investment,
      profitability: calculateProfitability(amount, investment),
    });

    setNewSource({
      name: '',
      type: INCOME_SOURCE_TYPES[0],
      amount: '',
      investment: '',
    });
    setShowAddForm(false);
    loadIncomeSources();
  };

  const optimizeNow = () => {
    AutomationService.optimizeIncome();
    loadIncomeSources();
    Alert.alert(
      'Optimierung abgeschlossen',
      'Ihre Einkommensquellen wurden optimiert'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Optimierung</Text>
          <Text style={styles.subtitle}>Einkommensquellen verwalten</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Zusammenfassung</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Aktive Quellen:</Text>
              <Text style={styles.summaryValue}>{incomeSources.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Gesamteinkommen:</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(AutomationService.calculateMaxIncome())}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.optimizeButton}
            onPress={optimizeNow}>
            <Text style={styles.optimizeButtonText}>
              Jetzt optimieren
            </Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Einkommensquellen</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddForm(!showAddForm)}>
                <Text style={styles.addButtonText}>
                  {showAddForm ? '✕' : '+'}
                </Text>
              </TouchableOpacity>
            </View>

            {showAddForm && (
              <View style={styles.addForm}>
                <Text style={styles.formLabel}>Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="z.B. Affiliate Marketing"
                  value={newSource.name}
                  onChangeText={(text) =>
                    setNewSource({...newSource, name: text})
                  }
                />

                <Text style={styles.formLabel}>Typ</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.typeContainer}>
                    {INCOME_SOURCE_TYPES.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.typeButton,
                          newSource.type === type && styles.typeButtonActive,
                        ]}
                        onPress={() =>
                          setNewSource({...newSource, type: type})
                        }>
                        <Text
                          style={[
                            styles.typeButtonText,
                            newSource.type === type &&
                              styles.typeButtonTextActive,
                          ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <Text style={styles.formLabel}>Monatliches Einkommen (€) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={newSource.amount}
                  onChangeText={(text) =>
                    setNewSource({...newSource, amount: text})
                  }
                />

                <Text style={styles.formLabel}>Investition (€)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={newSource.investment}
                  onChangeText={(text) =>
                    setNewSource({...newSource, investment: text})
                  }
                />

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={addIncomeSource}>
                  <Text style={styles.submitButtonText}>
                    Quelle hinzufügen
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.sourcesList}>
              {incomeSources.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>📊</Text>
                  <Text style={styles.emptyText}>
                    Noch keine Einkommensquellen
                  </Text>
                  <Text style={styles.emptySubtext}>
                    Fügen Sie Ihre erste Quelle hinzu
                  </Text>
                </View>
              ) : (
                incomeSources.map((source) => (
                  <IncomeSourceItem key={source.id} source={source} />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const IncomeSourceItem = ({source}) => (
  <View style={styles.sourceItem}>
    <View style={styles.sourceHeader}>
      <Text style={styles.sourceName}>{source.name}</Text>
      <Text style={styles.sourceAmount}>
        {formatCurrency(source.amount)}
      </Text>
    </View>
    <View style={styles.sourceDetails}>
      <Text style={styles.sourceType}>{source.type}</Text>
      <Text
        style={[
          styles.sourceProfitability,
          source.profitability >= 20 && styles.profitabilityHigh,
          source.profitability < 10 && styles.profitabilityLow,
        ]}>
        {source.profitability.toFixed(1)}% Rentabilität
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  optimizeButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  optimizeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  typeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  typeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  typeButtonActive: {
    backgroundColor: '#4CAF50',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sourcesList: {
    marginTop: 10,
  },
  sourceItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  sourceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sourceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceType: {
    fontSize: 14,
    color: '#666',
  },
  sourceProfitability: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  profitabilityHigh: {
    color: '#4CAF50',
  },
  profitabilityLow: {
    color: '#FF5722',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default IncomeOptimizationScreen;
