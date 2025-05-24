# 🔐 SafeKeys

**SafeKeys** est une application mobile open source de gestion de mots de passe. Elle a été pensée pour être **simple**, **pédagogique**, **sécurisée** et **accessible à tous**, même aux utilisateurs non-techniques.

---

## 🧠 Concept

SafeKeys vous permet de :

- Gérer facilement vos identifiants, mots de passe et autres données sensibles
- Stocker de manière chiffrée des clés API, codes Wi-Fi, numéros de carte, etc.
- Partager temporairement un mot de passe via un lien sécurisé à durée limitée
- Accéder à vos données hors-ligne
- Utiliser l'application **sans aucun cloud** par défaut (100% local)
- Activer la synchronisation **chiffrée et privée** (peer-to-peer ou via un stockage auto-hébergé)

---

## 🎯 Objectifs

- Créer une app **pédagogique**, claire et moderne
- Garantir la **souveraineté** des données utilisateurs
- Fonctionner **hors-ligne** dès l’installation
- Ne **forcer aucun cloud** tiers

---

## 👥 Public ciblé

| Segment                             | Besoin principal                               |
| ----------------------------------- | ---------------------------------------------- |
| Étudiants, développeurs             | Gérer mots de passe et clés sans prise de tête |
| Particuliers soucieux de vie privée | Ne pas dépendre du cloud US                    |
| Freelances, techs                   | Simplicité, import/export des données          |
| Seniors, utilisateurs non-tech      | Interface rassurante et simple                 |
| ONG, journalistes, militants        | 100% hors-ligne, sans inscription              |

---

## ✨ Fonctionnalités — MVP

- 🔐 Stockage local chiffré AES-256
- 🧩 Organisation en catégories (Sites, Apps, Perso, etc.)
- 📥 Import CSV sécurisé
- 📤 Export chiffré (format `.vault`)
- 🔑 Authentification biométrique (Face ID / Empreinte)
- 🌙 Mode hors-ligne total (aucune connexion sortante)
- 💾 Sauvegarde manuelle chiffrée
- 📱 UI intuitive (moins de 3 clics pour accéder à un mot de passe)

---

## ⚙️ Stack technique

| Côté                           | Stack choisie                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| 📱 Front-end Mobile            | [React Native](https://reactnative.dev/) avec Expo                                    |
| 💅 Design                      | [TailwindCSS](https://tailwindcss.com/) via [NativeWind](https://www.nativewind.dev/) |
| ⚛️ État global                 | Zustand ou Jotai (léger, simple à maintenir)                                          |
| 🔐 Sécurité locale             | Chiffrement AES-256, SecureStore, biométrie                                           |
| 🔗 Synchronisation (plus tard) | Chiffrement bout-à-bout, P2P ou auto-hébergé                                          |

---

## 🛡️ Sécurité

- Aucune donnée transmise sans action explicite
- Pas de tracking, pas de cloud imposé
- Chiffrement local fort avec AES-256
- Données stockées de manière sécurisée sur l'appareil
- Synchronisation optionnelle uniquement via moyens souverains (P2P ou WebDAV auto-hébergé)

---

## 🚧 Roadmap

- [x] Design System et palette de couleurs
- [ ] CRUD des mots de passe localement
- [ ] Authentification biométrique
- [ ] Export / Import chiffré
- [ ] Partage temporaire de mot de passe (via QR ou lien)
- [ ] Synchronisation P2P / WebDAV
- [ ] Mode onboarding pédagogique

---

## 📦 Installation

```bash
# Cloner le projet
git clone git@github.com:CapelleGab/SafeKeys.git
cd SafeKeys

# Installer les dépendances
npm install

# Lancer l'application
npx expo start
```
