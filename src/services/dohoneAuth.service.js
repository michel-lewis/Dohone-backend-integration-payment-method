// services/dohoneAuthService.js
const { Op } = require('sequelize');
const  AccessToken  = require('../models/accessToken.model');
require('dotenv').config();

class DohoneAuthService {
  async getAccessToken() {
    // 1. Vérifier en base si token valide existe
    const validToken = await this.findValidTokenInDB();
    if (validToken) {
      return validToken.access_token;
    }
    
    // 2. Sinon, appeler DOHONE
    const newToken = await this.fetchNewTokenFromDohone();
    
    // 3. Stocker en base
    await this.storeTokenInDB(newToken);
    
    return newToken.access_token;
  }
  
  async findValidTokenInDB() {
    return await AccessToken.findOne({
      where: { 
        is_active: true,
        expires_at: { [Op.gt]: new Date() }
      },
      order: [['created_at', 'DESC']]
    });
  }
  
  async fetchNewTokenFromDohone() {
    // Appel DIRECT à DOHONE (pas via dohone.service pour éviter dépendance circulaire)
    const baseUrl = process.env.DOHONE_BASE_URL;
    const credentials = `grant_type=password&client_id=${process.env.DOHONE_CLIENT_ID}&client_secret=${process.env.DOHONE_CLIENT_SECRET}&scope=read&username=${process.env.DOHONE_USERNAME}&password=${process.env.DOHONE_PASSWORD}`;
    
    const response = await fetch(`${baseUrl}/oauth/token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: credentials
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  async storeTokenInDB(tokenData) {
    // Calculer la date d'expiration
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);
    
    await AccessToken.create({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      refresh_token: tokenData.refresh_token,
      expires_at: expiresAt,
      is_active: true
    });
  }
}

module.exports = new DohoneAuthService();
