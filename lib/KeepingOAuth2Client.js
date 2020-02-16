'use strict';

const Homey = require('homey');
const { OAuth2Client, fetch } = require('homey-oauth2app');

module.exports = class KeepingOAuth2Client extends OAuth2Client {
	
	static get API_URL() {
    	return 'https://api.keeping.nl/v1';
  	}

  	static getHeaders() {
	    return {
	      'Cache-Control': 'no-cache',
	      'User-Agent': 'Homey/app.keeping',
	      'Accept-Language': 'en'
	    }
	}

	async getOrganisations() {
		return this.get({
			path: '/organisations',
		}).then(function (result) {
			return result.organisations;
		});
	}

	async getMe(organisationId) {
		return this.get({
			path: `/${organisationId}/users/me`,
		}).then(function (result) {
			return result.user;
		});
	}
	
}