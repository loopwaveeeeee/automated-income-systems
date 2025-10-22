import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import IncomeTracker from '../services/IncomeTracker';
import IncomeOptimizer from '../services/IncomeOptimizer';

const IncomeTrackingScreen = () => {
  const [tracker] = useState(new IncomeTracker());
  const [optimizer] = useState(new IncomeOptimizer({}));
  const [statistics, setStatistics] = useState({
    total: 0,
    average: 0,
    count: 0,
    lastEntry: null,
  });
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [newAmount, setNewAmount] = useState('');
  const [newSource, setNewSource] = useState('');
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await tracker.initialize();
    updateDisplay();
  };

  const updateDisplay = () => {
    const stats = tracker.getStatistics();
    const entries = tracker.getAllEntries();
    setStatistics(stats);
    setIncomeEntries(entries);

    // Perform analysis if we have data
    if (entries.length > 0) {
      const analysisResult = optimizer.analyzeIncomePatterns(entries);
      setAnalysis(analysisResult);
    }
  };

  const handleAddEntry = async () => {
    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number');
      return;
    }

    if (!newSource.trim()) {
      Alert.alert('Missing Source', 'Please enter an income source');
      return;
    }

    await tracker.addIncomeEntry({
      amount,
      source: newSource,
    });

    setNewAmount('');
    setNewSource('');
    updateDisplay();
    Alert.alert('Success', 'Income entry added successfully');
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getTrendIcon = () => {
    if (!analysis || !analysis.trend) return '📊';
    if (analysis.trend > 0.1) return '📈';
    if (analysis.trend < -0.1) return '📉';
    return '➡️';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(statistics.total)}</Text>
            <Text style={styles.statLabel}>Total Income</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(statistics.average)}</Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{statistics.count}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
        </View>

        {analysis && (
          <View style={styles.analysisContainer}>
            <View style={styles.analysisHeader}>
              <Text style={styles.analysisIcon}>{getTrendIcon()}</Text>
              <Text style={styles.analysisTitle}>Income Analysis</Text>
            </View>
            <Text style={styles.analysisText}>
              Average Income: {formatCurrency(analysis.averageIncome)}
            </Text>
            <Text style={styles.analysisText}>
              Trend: {(analysis.trend * 100).toFixed(1)}%
            </Text>
            <Text style={styles.analysisText}>
              Volatility: {(analysis.volatility * 100).toFixed(1)}%
            </Text>
            
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Recommendations:</Text>
                {analysis.recommendations.map((rec, index) => (
                  <View key={index} style={styles.recommendation}>
                    <Text style={styles.recommendationPriority}>
                      {rec.priority === 'high' ? '🔴' : '🟡'}
                    </Text>
                    <Text style={styles.recommendationText}>{rec.message}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.addEntryContainer}>
          <Text style={styles.sectionTitle}>Add Income Entry</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={newAmount}
            onChangeText={setNewAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Source (e.g., Freelance, Investment)"
            value={newSource}
            onChangeText={setNewSource}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
            <Text style={styles.addButtonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.entriesContainer}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          {incomeEntries.length === 0 ? (
            <Text style={styles.emptyText}>No entries yet. Add your first income entry above!</Text>
          ) : (
            incomeEntries.slice().reverse().map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryAmount}>{formatCurrency(entry.amount)}</Text>
                  <Text style={styles.entryDate}>{formatDate(entry.timestamp)}</Text>
                </View>
                <Text style={styles.entrySource}>{entry.source}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  analysisContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  analysisIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  analysisText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recommendationsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationPriority: {
    fontSize: 16,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  addEntryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entriesContainer: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  entryDate: {
    fontSize: 12,
    color: '#999',
  },
  entrySource: {
    fontSize: 14,
    color: '#666',
  },
});

export default IncomeTrackingScreen;
