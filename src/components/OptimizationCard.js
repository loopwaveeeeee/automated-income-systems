import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OptimizationCard = ({ opportunity }) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{getImpactIcon(opportunity.impact)}</Text>
        <Text style={styles.title}>{opportunity.title}</Text>
      </View>
      <Text style={styles.description}>{opportunity.description}</Text>
      <View style={styles.footer}>
        <Text style={[styles.impact, { color: getImpactColor(opportunity.impact) }]}>
          {opportunity.impact.toUpperCase()} IMPACT
        </Text>
        <Text style={styles.type}>{opportunity.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  impact: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 12,
    color: '#999',
    textTransform: 'capitalize',
  },
});

export default OptimizationCard;
