'use strict';

const Homey = require('homey');
const { OAuth2Device } = require('homey-oauth2app');

module.exports = class KeepingAccountDevice extends OAuth2Device {
	
	onOAuth2Init() {
		this.log('KeepingAccountDevice has been inited');
	}

	onOAuth2Migrate() {

		const sessionId = this.getStore().OAuth2SessionId;
		const configId = 'default';

		return {
			sessionId,
			configId
		}  	
	}
	
};