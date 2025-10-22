import React, { useState } from 'react';
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
import { SETUP_STEPS, DEFAULT_CONFIG } from '../config/setupSequence';
import IncomeOptimizer from '../services/IncomeOptimizer';

const SetupSequenceScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ ...DEFAULT_CONFIG });
  const optimizer = new IncomeOptimizer(formData);

  const handleNext = () => {
    if (currentStep < SETUP_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - activate
      handleActivation();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleActivation = () => {
    const optimized = optimizer.optimize(formData);
    Alert.alert(
      'Success!',
      'Your automated income system has been activated! The system will now work to maximize your income potential.',
      [
        {
          text: 'View Tracking',
          onPress: () => navigation.navigate('IncomeTracking'),
        },
        {
          text: 'Done',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'number':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(formData[field.id] || '')}
              onChangeText={(value) => updateFormData(field.id, Number(value))}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </View>
        );

      case 'select':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <View style={styles.optionsContainer}>
              {field.options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    formData[field.id] === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => updateFormData(field.id, option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData[field.id] === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'boolean':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <View style={styles.booleanRow}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  formData[field.id] && styles.toggleButtonActive,
                ]}
                onPress={() => updateFormData(field.id, !formData[field.id])}
              >
                <Text
                  style={[
                    styles.toggleText,
                    formData[field.id] && styles.toggleTextActive,
                  ]}
                >
                  {formData[field.id] ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const step = SETUP_STEPS[currentStep];
  const progress = ((currentStep + 1) / SETUP_STEPS.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {SETUP_STEPS.length}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepDescription}>{step.description}</Text>

        <View style={styles.fieldsContainer}>
          {step.fields.map(renderField)}
        </View>

        {currentStep === SETUP_STEPS.length - 1 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Setup Summary</Text>
            <Text style={styles.summaryText}>
              Income Goal: ${formData.income_goal}/month
            </Text>
            <Text style={styles.summaryText}>
              Risk Level: {formData.risk_level}
            </Text>
            <Text style={styles.summaryText}>
              Auto-Optimization: {formData.auto_optimize ? 'Enabled' : 'Disabled'}
            </Text>
            <Text style={styles.summaryText}>
              Optimization: {formData.optimization_frequency}
            </Text>
            <Text style={styles.summaryText}>
              Notifications: {formData.enable_notifications ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevious}
          >
            <Text style={styles.backButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === SETUP_STEPS.length - 1 ? 'Activate' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  fieldsContainer: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  booleanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  toggleButtonActive: {
    backgroundColor: '#4CAF50',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#fff',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetupSequenceScreen;
