'use strict';

const Homey = require('homey');
const { OAuth2Device } = require('homey-oauth2app');

const INTERVAL = 1000 * 60 * 15; // 15 min

module.exports = class KeepingAccountDevice extends OAuth2Device {
	
	async onOAuth2Init() {
		this.log('KeepingAccountDevice has been inited');

		this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));

		await this.checkOngoingEntry()
		this.checkOngoingEntryInterval = setInterval(this.checkOngoingEntry, SYNC_FLOW_TOKENS_INTRVAL);
	}

	onOAuth2Migrate() {

		const sessionId = this.getStore().OAuth2SessionId;
		const configId = 'default';

		return {
			sessionId,
			configId
		}  	
	}

	checkOngoingEntry()
	{
		const organisationId = this.getData().organisation.id;
		const userId = this.getData().user.id;

		this.setCapabilityValue('onoff', true)
					.catch(this.error);

		return this.oAuth2Client.getOngoingEntry(organisationId, userId)
			.then(timeEntry => {

				this.setCapabilityValue('onoff', true)
					.catch(this.error);

				return true;
				
			}).catch(error => {

				this.setCapabilityValue('onoff', false)
					.catch(this.error);

				return false;
			});
	}

	async onCapabilityOnoff( turnOn, opts ) {

		const organisationId = this.getData().organisation.id;
		const userId = this.getData().user.id;

		const isOn = await this.checkOngoingEntry();
		
		if (isOn && !turnOn) {
			this.log('stopping entry');

			const ongoing = await this.oAuth2Client.getOngoingEntry(organisationId, userId);

			return this.oAuth2Client.stopEntry(organisationId, ongoing.id)
				.then(timeEntry => {
					this.setCapabilityValue('onoff', false)
						.catch(this.error);
					return true;
				});
		} else if(!isOn && turnOn) {
			this.log('resuming entry');

			const last = await this.oAuth2Client.getLastEntry(organisationId, userId);

			return this.oAuth2Client.resumeEntry(organisationId, last.id)
				.then(timeEntry => {
					this.setCapabilityValue('onoff', true)
						.catch(this.error);
					return true;
				});
		}
	}
	
};