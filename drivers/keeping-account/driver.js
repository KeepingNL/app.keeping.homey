'use strict';

const Homey = require('homey');
const { OAuth2Driver } = require('homey-oauth2app');

module.exports = class KeepingAccountDriver extends OAuth2Driver {
	
	onInit() {
		this.log('KeepingAccountDriver has been inited');
	}
	

	async onPairListDevices({ oAuth2Client }) {
		
		const organisations = await oAuth2Client.getOrganisations();

		const users = await Promise.all(organisations.map(organisation => {
			return oAuth2Client.getMe(organisation.id);
		}));

		return organisations.map((organisation, i) => {

			const user = users[i];

			return {
				name: `${user.first_name} (${organisation.name})`,
				data: {
					organisation,
					user
				}
			}
		});
	  }
};