'use strict';

const Homey = require('homey');
const { OAuth2Device } = require('homey-oauth2app');

module.exports = class KeepingOrganisationDevice extends OAuth2Device {
	
	onOAuth2Init() {
		this.log('KeepingOrganisationDevice has been inited');
	}
	
};