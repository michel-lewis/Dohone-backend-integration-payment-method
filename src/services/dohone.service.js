const authService = require('./dohoneAuth.service');
require ('dotenv').config()

const baseUrl = process.env.DOHONE_BASE_URL;

class DohoneApiServices {
    async call(endpoint, data, options = {}) {
        try {
          // Récupère automatiquement un token valide
          const token = await authService.getAccessToken();
          
          const response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              ...options.headers
            },
            ...options,
            body: data ? JSON.stringify(data) : undefined
          });
          
          return await response.json();
        } catch (error) {
          throw error;
        }
      }
}

module.exports = new DohoneApiServices();
