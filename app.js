'use strict';

const Homey = require('homey');
const { OAuth2App } = require('homey-oauth2app');
const KeepingOAuth2Client = require('./lib/KeepingOAuth2Client');

module.exports = class KeepingApp extends OAuth2App {
	
	onOAuth2Init() {
			 
  		this.setOAuth2Config({
    		client: KeepingOAuth2Client,
    		apiUrl: 'https://api.keeping.nl/v1',
    		tokenUrl: 'https://api.keeping.nl/v1/oauth/token',
    		authorizationUrl: 'https://keeping.nl/oauth/authorize',
    		scopes: ['time'],
    		clientId: Homey.env.CLIENT_ID,
			clientSecret: Homey.env.CLIENT_SECRET,
			allowMultiSession: true
  		});
  	
		this.log('Keeping is running...');
	}
};