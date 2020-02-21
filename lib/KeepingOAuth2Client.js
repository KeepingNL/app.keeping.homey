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

	async getOngoingEntry(organisationId, userId) {
		return this.get({
			path: `/${organisationId}/time-entries/last?user_id=${userId}&purpose=work&ongoing=1&locked=0`,
		}).then(function (result) {
			return result.time_entry;
		});
	}

	async getLastEntry(organisationId, userId) {
		return this.get({
			path: `/${organisationId}/time-entries/last?user_id=${userId}&purpose=work&ongoing=0&locked=0`,
		}).then(function (result) {
			return result.time_entry;
		});
}

	async resumeEntry(organisationId, entryId) {
		return this.post({
			path: `/${organisationId}/time-entries/${entryId}/resume`,
		}).then(function (result) {
			return result.time_entry;
		});
	}

	async stopEntry(organisationId, entryId) {
		return this.patch({
			path: `/${organisationId}/time-entries/${entryId}/stop`,
		}).then(function (result) {
			return result.time_entry;
		});
	}

	async patch({
		path,
		query,
		json,
		body,
		headers,
	  }) {
		return this._queueRequest({
		  method: 'patch',
		  path,
		  query,
		  json,
		  body,
		  headers,
		});
	  }
	
}