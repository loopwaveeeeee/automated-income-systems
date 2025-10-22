import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AutomationService from '../services/AutomationService';
import {SETUP_SEQUENCE} from '../config/incomeConfig';

const SetupScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startSetup = async () => {
    setIsRunning(true);
    
    await AutomationService.runSetupSequence((step, current, total) => {
      setCurrentStep(current);
    });

    setIsRunning(false);
    setIsComplete(true);
    
    // Starte Automatisierung nach Setup
    AutomationService.startAutomation();
  };

  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Einkommens-Setup</Text>
          <Text style={styles.subtitle}>
            Vollautomatische Konfiguration
          </Text>
        </View>

        <View style={styles.content}>
          {!isRunning && !isComplete && (
            <>
              <Text style={styles.description}>
                Die automatische Setup-Sequenz konfiguriert Ihr System für
                maximales Einkommen. Dieser Vorgang ist vollständig automatisiert.
              </Text>

              <View style={styles.stepsContainer}>
                {SETUP_SEQUENCE.map((step, index) => (
                  <StepItem
                    key={step.id}
                    step={step}
                    isActive={false}
                    isComplete={false}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={startSetup}>
                <Text style={styles.buttonText}>Setup starten</Text>
              </TouchableOpacity>
            </>
          )}

          {isRunning && (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.progressText}>
                Schritt {currentStep} von {SETUP_SEQUENCE.length}
              </Text>
              {SETUP_SEQUENCE.map((step, index) => (
                <StepItem
                  key={step.id}
                  step={step}
                  isActive={index + 1 === currentStep}
                  isComplete={index + 1 < currentStep}
                />
              ))}
            </View>
          )}

          {isComplete && (
            <View style={styles.completeContainer}>
              <Text style={styles.completeIcon}>✅</Text>
              <Text style={styles.completeTitle}>Setup abgeschlossen!</Text>
              <Text style={styles.completeDescription}>
                Ihr System ist jetzt vollständig konfiguriert und automatisiert.
                Die Optimierung läuft im Hintergrund.
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={goToDashboard}>
                <Text style={styles.buttonText}>Zum Dashboard</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StepItem = ({step, isActive, isComplete}) => (
  <View style={[
    styles.stepItem,
    isActive && styles.stepItemActive,
    isComplete && styles.stepItemComplete,
  ]}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>
        {isComplete ? '✓' : step.id}
      </Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{step.title}</Text>
      <Text style={styles.stepDescription}>{step.description}</Text>
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepsContainer: {
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  stepItemActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  stepItemComplete: {
    backgroundColor: '#C8E6C9',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  completeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  completeIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  completeDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default SetupScreen;
