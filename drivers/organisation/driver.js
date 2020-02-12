'use strict';

const Homey = require('homey');

const { OAuth2Driver } = require('homey-oauth2app');

module.exports = class KeepingOrganisationDriver extends OAuth2Driver {
	
	onInit() {
		this.log('KeepingOrganisationDriver has been inited');
	}
	
};