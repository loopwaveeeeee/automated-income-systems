# Automated Income Systems - Installation Guide

## Plattform-spezifische Installation

### Android Installation

1. **Voraussetzungen**:
   - Android Studio installiert
   - Android SDK (API Level 28 oder höher)
   - Java Development Kit (JDK) 11 oder höher

2. **Build und Installation**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **APK installieren**:
   - Die fertige APK befindet sich in: `android/app/build/outputs/apk/release/app-release.apk`
   - Auf Android-Gerät übertragen und installieren

### iOS Installation

1. **Voraussetzungen**:
   - macOS mit Xcode installiert
   - CocoaPods installiert (`sudo gem install cocoapods`)
   - Apple Developer Account (für Geräte-Installation)

2. **Dependencies installieren**:
   ```bash
   cd ios
   pod install
   ```

3. **Build und Installation**:
   - Öffnen Sie `ios/AutomatedIncomeSystems.xcworkspace` in Xcode
   - Wählen Sie Ihr Zielgerät
   - Klicken Sie auf "Run" oder drücken Sie Cmd+R

## Entwicklungs-Setup

### Schnellstart
```bash
# Dependencies installieren
npm install

# Metro Bundler starten
npm start

# In separatem Terminal - Android
npm run android

# Oder iOS (nur macOS)
npm run ios
```

### Verfügbare Kommandos

- `npm start` - Startet Metro Bundler
- `npm run android` - Startet Android App
- `npm run ios` - Startet iOS App
- `npm test` - Führt Tests aus
- `npm run lint` - Führt Linting aus

## Fehlerbehebung

### Metro Bundler Cache löschen
```bash
npm start -- --reset-cache
```

### Android Build-Probleme
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Build-Probleme
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

## App Features nach Installation

Nach erfolgreicher Installation können Sie:

1. **Setup-Sequenz durchlaufen**: Automatische Konfiguration für maximales Einkommen
2. **Dashboard nutzen**: Überwachen Sie Ihre Einkommensquellen in Echtzeit
3. **Optimierung aktivieren**: Lassen Sie die App Ihre Einnahmen automatisch optimieren
4. **Quellen verwalten**: Fügen Sie neue Einkommensquellen hinzu und verwalten Sie diese

## Support

Bei Problemen oder Fragen:
- Prüfen Sie die Logs in der Konsole
- Stellen Sie sicher, dass alle Dependencies korrekt installiert sind
- Vergewissern Sie sich, dass Ihr Gerät die Mindestanforderungen erfüllt
