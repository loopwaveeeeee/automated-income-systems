import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AutomationService from '../services/AutomationService';
import {formatCurrency} from '../utils/helpers';

const DashboardScreen = ({navigation}) => {
  const [status, setStatus] = useState({
    isRunning: false,
    activeSources: 0,
    totalIncome: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    updateStatus();
  }, []);

  const updateStatus = () => {
    const currentStatus = AutomationService.getStatus();
    setStatus(currentStatus);
  };

  const onRefresh = () => {
    setRefreshing(true);
    updateStatus();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleAutomation = () => {
    if (status.isRunning) {
      AutomationService.stopAutomation();
    } else {
      AutomationService.startAutomation();
    }
    updateStatus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Einkommen im Überblick</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.statusCard}>
            <View style={styles.statusIndicator}>
              <View
                style={[
                  styles.statusDot,
                  status.isRunning && styles.statusDotActive,
                ]}
              />
              <Text style={styles.statusText}>
                {status.isRunning ? 'Aktiv' : 'Inaktiv'}
              </Text>
            </View>
            <Text style={styles.statusLabel}>Automatisierung</Text>
          </View>

          <View style={styles.statsContainer}>
            <StatCard
              title="Gesamteinkommen"
              value={formatCurrency(status.totalIncome)}
              icon="💰"
              color="#4CAF50"
            />
            <StatCard
              title="Aktive Quellen"
              value={status.activeSources.toString()}
              icon="📊"
              color="#2196F3"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              !status.isRunning && styles.buttonInactive,
            ]}
            onPress={toggleAutomation}>
            <Text style={styles.buttonText}>
              {status.isRunning
                ? 'Automatisierung stoppen'
                : 'Automatisierung starten'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optimizationButton}
            onPress={() => navigation.navigate('Optimization')}>
            <Text style={styles.optimizationButtonText}>
              Zu den Optimierungen →
            </Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <InfoItem
              icon="⚙️"
              title="Vollautomatisch"
              description="Das System optimiert Ihr Einkommen automatisch"
            />
            <InfoItem
              icon="📈"
              title="Kontinuierliche Verbesserung"
              description="Ständige Anpassung für maximale Erträge"
            />
            <InfoItem
              icon="🔔"
              title="Benachrichtigungen"
              description="Werden über wichtige Änderungen informiert"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatCard = ({title, value, icon, color}) => (
  <View style={[styles.statCard, {borderLeftColor: color}]}>
    <Text style={styles.statIcon}>{icon}</Text>
    <View style={styles.statContent}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  </View>
);

const InfoItem = ({icon, title, description}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View style={styles.infoContent}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDescription}>{description}</Text>
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
  statusCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonInactive: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optimizationButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom: 20,
  },
  optimizationButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default DashboardScreen;
