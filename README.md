# Dohone Payment Integration API

API backend pour l'intégration des paiements via la plateforme Dohone. Cette solution permet de gérer les transactions de paiement mobile money et autres méthodes de paiement disponibles sur Dohone.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Documentation API](#documentation-api)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Auteur](#auteur)
- [Licence](#licence)

## ✨ Fonctionnalités

- 💳 Intégration complète avec l'API Dohone
- 🔐 Authentification sécurisée avec gestion des tokens d'accès
- 💸 Envoi de paiements via différents opérateurs
- 🌐 Interface de paiement web (webpay)
- 📊 Gestion des transactions et notifications
- 🗄️ Persistance des données avec Sequelize ORM
- 📝 Documentation API interactive avec Swagger
- 🔄 Support CORS pour les applications frontend

## 🛠️ Technologies utilisées

- **Node.js** - Environnement d'exécution JavaScript
- **Express.js v5** - Framework web minimaliste
- **Sequelize v6** - ORM pour la gestion de base de données
- **MySQL2** - Driver MySQL pour Node.js
- **Swagger UI Express** - Documentation API interactive
- **Joi** - Validation des données
- **dotenv** - Gestion des variables d'environnement
- **CORS** - Gestion des requêtes cross-origin
- **Moment.js** - Manipulation des dates

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure)
- **npm** ou **yarn**
- **MySQL** (ou une autre base de données compatible avec Sequelize)
- Un compte marchand **Dohone** avec les identifiants API

## 🚀 Installation

1. **Cloner le repository**

```bash
git clone https://github.com/michel-lewis/Dohone-backend-integration-payment-method.git
cd Dohone-backend-integration-payment-method
```

2. **Installer les dépendances**

```bash
npm install
```

## ⚙️ Configuration

1. **Créer un fichier `.env`** à la racine du projet avec les variables suivantes :

```env
# Configuration du serveur
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=nom_de_la_base
DB_DIALECT=mysql

# Identifiants Dohone API
DOHONE_API_URL=https://api.dohone.com
DOHONE_MERCHANT_KEY=votre_merchant_key
DOHONE_API_USERNAME=votre_username
DOHONE_API_PASSWORD=votre_password

# Autres configurations
NODE_ENV=development
```

2. **Configurer la base de données**

Assurez-vous que votre base de données MySQL est créée et accessible avec les identifiants fournis dans le fichier `.env`.

3. **Générer la documentation Swagger** (optionnel)

```bash
npm run docs
```

## 💻 Utilisation

### Démarrage en mode développement

```bash
npm run dev
```

Le serveur démarre avec nodemon et redémarre automatiquement à chaque modification.

### Démarrage en mode production

```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3000` (ou le port défini dans `.env`).

## 🔌 API Endpoints

### Paiements

#### Envoyer un paiement

```http
POST /payment/send
Content-Type: application/json

{
  "amount": 1000,
  "currency": "XAF",
  "phoneNumber": "237XXXXXXXXX",
  "operatorID": "OM",
  "description": "Description du paiement"
}
```

### Webpay

#### Paiement web avec opérateur spécifique

```http
GET /pay/:acquirertrxref/:operatorID
```

#### Paiement web sans opérateur spécifique

```http
GET /pay/:acquirertrxref
```

**Paramètres :**
- `acquirertrxref` : Référence unique de la transaction
- `operatorID` : (Optionnel) Identifiant de l'opérateur (OM, MOMO, etc.)

## 📚 Documentation API

Une documentation interactive Swagger est disponible une fois le serveur démarré :

```
http://localhost:3000/api-docs
```

Cette interface permet de :
- Visualiser tous les endpoints disponibles
- Tester les requêtes directement depuis le navigateur
- Consulter les schémas de données

## 📁 Structure du projet

```
dohone-integration/
├── src/
│   ├── config/           # Configuration de la base de données
│   │   └── dbConnection.js
│   ├── controllers/      # Contrôleurs des routes
│   │   └── payment.controller.js
│   ├── middlewares/      # Middlewares personnalisés
│   ├── models/           # Modèles Sequelize
│   │   ├── accessToken.model.js
│   │   ├── bill.model.js
│   │   ├── notification.model.js
│   │   ├── tranfert.model.js
│   │   └── transaction.model.js
│   ├── routes/           # Définition des routes
│   │   ├── payment.routes.js
│   │   └── webpay.routes.js
│   ├── services/         # Logique métier et services externes
│   │   ├── dohone.service.js
│   │   └── dohoneAuth.service.js
│   ├── utils/            # Fonctions utilitaires
│   │   └── generateVoucherCode.utils.js
│   └── index.js          # Point d'entrée de l'application
├── .env                  # Variables d'environnement (non versionné)
├── .gitignore
├── package.json
├── swagger.js            # Configuration Swagger
├── swagger-output.json   # Documentation Swagger générée
└── README.md
```

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm start` | Démarre le serveur en mode production |
| `npm run dev` | Démarre le serveur en mode développement avec nodemon |
| `npm run docs` | Génère la documentation Swagger |
| `npm test` | Lance les tests (à configurer) |

## 🏗️ Architecture

Le projet suit une architecture MVC (Model-View-Controller) avec une séparation claire des responsabilités :

- **Models** : Définissent la structure des données et interagissent avec la base de données
- **Controllers** : Gèrent la logique de traitement des requêtes HTTP
- **Services** : Contiennent la logique métier et les appels aux API externes
- **Routes** : Définissent les endpoints et associent les contrôleurs
- **Utils** : Fonctions utilitaires réutilisables

## 🔒 Sécurité

- Les identifiants sensibles sont stockés dans des variables d'environnement
- Le fichier `.env` est exclu du versioning via `.gitignore`
- Validation des données entrantes avec Joi
- Gestion sécurisée des tokens d'authentification Dohone

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 👤 Auteur

**michel-lewis**

- GitHub: [@michel-lewis](https://github.com/michel-lewis)
- Repository: [Dohone-backend-integration-payment-method](https://github.com/michel-lewis/Dohone-backend-integration-payment-method)

## 📄 Licence

Ce projet est sous licence ISC.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur le [repository GitHub](https://github.com/michel-lewis/Dohone-backend-integration-payment-method/issues).

---

**Note :** Assurez-vous de bien configurer vos identifiants Dohone avant de déployer en production. Ne partagez jamais vos clés API publiquement.