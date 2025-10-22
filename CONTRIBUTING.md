# Beitragen zu Automated Income Systems

Vielen Dank für Ihr Interesse, zu Automated Income Systems beizutragen! 🎉

## 📋 Inhaltsverzeichnis

- [Code of Conduct](#code-of-conduct)
- [Erste Schritte](#erste-schritte)
- [Entwicklungsprozess](#entwicklungsprozess)
- [Pull Requests](#pull-requests)
- [Coding-Standards](#coding-standards)
- [Testing](#testing)
- [Dokumentation](#dokumentation)
- [Community](#community)

## Code of Conduct

Dieses Projekt und alle Beteiligten verpflichten sich zu einem respektvollen und konstruktiven Umgang. Wir erwarten von allen Mitwirkenden:

- Respektvolle und inklusive Sprache
- Akzeptanz unterschiedlicher Standpunkte
- Konstruktive Kritik
- Fokus auf das Beste für die Community

## Erste Schritte

### Repository Setup

1. **Forken Sie das Repository**
   ```bash
   # Klicken Sie auf "Fork" auf GitHub
   ```

2. **Klonen Sie Ihren Fork**
   ```bash
   git clone https://github.com/IHR-USERNAME/automated-income-systems.git
   cd automated-income-systems
   ```

3. **Installieren Sie Dependencies**
   ```bash
   npm install
   ```

4. **Erstellen Sie einen Feature-Branch**
   ```bash
   git checkout -b feature/mein-neues-feature
   ```

### Entwicklungsumgebung

- Node.js >= 16
- React Native CLI
- Android Studio (für Android-Entwicklung)
- Xcode (für iOS-Entwicklung, nur macOS)
- Git

## Entwicklungsprozess

### Arten von Beiträgen

Wir freuen uns über verschiedene Arten von Beiträgen:

- 🐛 **Bug Reports**: Melden Sie Fehler über GitHub Issues
- ✨ **Feature Requests**: Schlagen Sie neue Features vor
- 📝 **Dokumentation**: Verbessern oder erweitern Sie die Docs
- 💻 **Code**: Implementieren Sie neue Features oder beheben Sie Bugs
- 🧪 **Tests**: Fügen Sie Tests hinzu oder verbessern Sie bestehende

### Workflow

1. **Issue erstellen oder auswählen**
   - Prüfen Sie, ob bereits ein Issue existiert
   - Erstellen Sie ein neues Issue für Ihre Idee
   - Warten Sie auf Feedback vor größeren Änderungen

2. **Branch erstellen**
   ```bash
   git checkout -b feature/issue-123-kurze-beschreibung
   ```

3. **Entwickeln**
   - Schreiben Sie sauberen, lesbaren Code
   - Folgen Sie den Coding-Standards
   - Fügen Sie Tests hinzu
   - Aktualisieren Sie die Dokumentation

4. **Testen**
   ```bash
   npm test
   npm run lint
   ```

5. **Committen**
   ```bash
   git add .
   git commit -m "feat: Kurze Beschreibung der Änderung"
   ```

6. **Pushen**
   ```bash
   git push origin feature/issue-123-kurze-beschreibung
   ```

7. **Pull Request erstellen**
   - Öffnen Sie einen PR gegen den `main` Branch
   - Beschreiben Sie Ihre Änderungen ausführlich
   - Verlinken Sie relevante Issues

## Pull Requests

### PR-Checkliste

Bevor Sie einen PR einreichen, stellen Sie sicher:

- [ ] Code folgt den Projekt-Konventionen
- [ ] Tests wurden hinzugefügt/aktualisiert
- [ ] Alle Tests bestehen (`npm test`)
- [ ] Linting ist erfolgreich (`npm run lint`)
- [ ] Dokumentation wurde aktualisiert
- [ ] CHANGELOG.md wurde aktualisiert (bei Features/Fixes)
- [ ] Commit-Messages folgen dem Format
- [ ] PR-Beschreibung ist aussagekräftig

### PR-Beschreibung Template

```markdown
## Beschreibung
[Kurze Beschreibung der Änderungen]

## Art der Änderung
- [ ] Bug Fix
- [ ] Neues Feature
- [ ] Breaking Change
- [ ] Dokumentation

## Motivation und Kontext
[Warum ist diese Änderung notwendig?]

## Wie wurde getestet?
[Beschreibung der Tests]

## Screenshots (falls zutreffend)
[Screenshots hier einfügen]

## Checklist
- [ ] Tests hinzugefügt
- [ ] Dokumentation aktualisiert
- [ ] CHANGELOG aktualisiert
```

## Coding-Standards

### JavaScript/React Native

#### Naming Conventions
```javascript
// Komponenten: PascalCase
const WelcomeScreen = () => { ... }

// Funktionen: camelCase
const calculateProfitability = () => { ... }

// Konstanten: UPPER_SNAKE_CASE
const MAX_INCOME_SOURCES = 10;

// Dateien: PascalCase für Komponenten, camelCase für Utils
WelcomeScreen.js
helpers.js
```

#### Code-Style
- 2 Leerzeichen für Einrückung
- Semikolons verwenden
- Single quotes für Strings (außer JSX)
- Trailing commas in Arrays/Objects
- Arrow functions bevorzugen

#### Kommentare
```javascript
// Gute Kommentare
// Berechnet die Rentabilität basierend auf Einkommen und Investition
const profitability = calculateProfitability(income, investment);

// Schlechte Kommentare (offensichtlich)
// Setze x auf 10
const x = 10;
```

### Komponenten-Struktur
```javascript
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Service from '../services/Service';

const MyComponent = ({prop1, prop2}) => {
  // Hooks
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, []);

  // Handler functions
  const handleAction = () => {
    // Implementation
  };

  // Render
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyComponent;
```

## Testing

### Test-Guidelines

- Schreiben Sie Tests für neue Features
- Aktualisieren Sie Tests bei Änderungen
- Ziel: >80% Code Coverage
- Verwenden Sie beschreibende Test-Namen

### Test-Struktur
```javascript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  test('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Tests ausführen
```bash
# Alle Tests
npm test

# Mit Coverage
npm test -- --coverage

# Watch Mode
npm test -- --watch

# Spezifische Datei
npm test -- AutomationService.test.js
```

## Dokumentation

### Was dokumentieren?

- Neue Features in README.md
- API-Änderungen in entsprechenden Docs
- Breaking Changes prominent hervorheben
- Code-Kommentare für komplexe Logik

### Dokumentations-Stil

- Klare, prägnante Sprache
- Beispiele hinzufügen wo sinnvoll
- Screenshots für UI-Änderungen
- Schritt-für-Schritt Anleitungen

## Commit-Messages

Wir folgen dem [Conventional Commits](https://www.conventionalcommits.org/) Format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: Neues Feature
- `fix`: Bug Fix
- `docs`: Dokumentation
- `style`: Formatierung, keine Code-Änderung
- `refactor`: Code-Refactoring
- `test`: Tests hinzufügen/ändern
- `chore`: Build-Prozess, Dependencies

### Beispiele
```bash
feat(dashboard): add income chart visualization
fix(automation): correct profitability calculation
docs(readme): update installation instructions
test(helpers): add tests for currency formatting
```

## Community

### Kontakt und Support

- **GitHub Issues**: Bug Reports und Feature Requests
- **GitHub Discussions**: Allgemeine Fragen und Diskussionen
- **Pull Requests**: Code-Beiträge

### Hilfe erhalten

Wenn Sie Hilfe benötigen:
1. Prüfen Sie die Dokumentation
2. Suchen Sie in bestehenden Issues
3. Erstellen Sie ein neues Issue mit Details:
   - Beschreibung des Problems
   - Schritte zur Reproduktion
   - Erwartetes vs. tatsächliches Verhalten
   - Umgebung (OS, Node Version, etc.)

## Lizenz

Durch Ihren Beitrag stimmen Sie zu, dass Ihre Beiträge unter der MIT-Lizenz lizenziert werden.

---

Vielen Dank für Ihren Beitrag zu Automated Income Systems! 🚀
