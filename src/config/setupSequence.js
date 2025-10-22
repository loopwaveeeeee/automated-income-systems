/**
 * Income Setup Sequence Configuration
 * Defines the steps and parameters for setting up automated income systems
 */

export const SETUP_STEPS = [
  {
    id: 'initial_config',
    title: 'Initial Configuration',
    description: 'Set up your basic income parameters and goals',
    fields: [
      {
        id: 'income_goal',
        label: 'Monthly Income Goal',
        type: 'number',
        required: true,
        min: 0,
      },
      {
        id: 'risk_level',
        label: 'Risk Level',
        type: 'select',
        options: ['Low', 'Medium', 'High'],
        required: true,
      },
    ],
  },
  {
    id: 'income_sources',
    title: 'Income Source Selection',
    description: 'Choose and configure your income sources',
    fields: [
      {
        id: 'primary_source',
        label: 'Primary Income Source',
        type: 'select',
        options: ['Investments', 'Business', 'Freelance', 'Passive Income'],
        required: true,
      },
      {
        id: 'secondary_sources',
        label: 'Additional Income Sources',
        type: 'multiselect',
        options: ['Dividends', 'Rental', 'Royalties', 'Affiliate', 'Other'],
        required: false,
      },
    ],
  },
  {
    id: 'optimization',
    title: 'Optimization Settings',
    description: 'Configure automated optimization rules',
    fields: [
      {
        id: 'auto_optimize',
        label: 'Enable Auto-Optimization',
        type: 'boolean',
        default: true,
      },
      {
        id: 'optimization_frequency',
        label: 'Optimization Frequency',
        type: 'select',
        options: ['Daily', 'Weekly', 'Monthly'],
        required: true,
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Tracking Setup',
    description: 'Set up income tracking and notifications',
    fields: [
      {
        id: 'enable_notifications',
        label: 'Enable Notifications',
        type: 'boolean',
        default: true,
      },
      {
        id: 'notification_threshold',
        label: 'Notification Threshold',
        type: 'number',
        min: 0,
      },
    ],
  },
  {
    id: 'activation',
    title: 'Activation',
    description: 'Review and activate your automated income system',
    fields: [],
  },
];

export const DEFAULT_CONFIG = {
  income_goal: 5000,
  risk_level: 'Medium',
  auto_optimize: true,
  optimization_frequency: 'Weekly',
  enable_notifications: true,
};
