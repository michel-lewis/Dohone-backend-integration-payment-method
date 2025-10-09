const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dohone Integration API',
    description: 'API pour l\'intégration des paiements Dohone',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
