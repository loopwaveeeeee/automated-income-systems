// Mock für react-native damit Node-Tests laufen
module.exports = {
  StyleSheet: { create: (s) => s },
  View: () => null,
  Text: () => null,
  TouchableOpacity: () => null,
  ScrollView: () => null,
  TextInput: () => null,
  Alert: { alert: () => {} },
  Platform: { OS: 'ios', select: (obj) => obj.ios || obj.default },
};
