import axios from 'axios';
import * as constants from '../constants';

/**
 * Get available plans
 * @param {string} url
 * @param {number} id
 * @param {string} token

 */
export function getAvailablePlans(url, id, token) {
	return axios.get(url + constants.GET_PLANS, {
		params: {
			id,
			token,
		},
	});
}

/**
 * Submit new plan subscription
 * @param {number} id
 * @param {string} token
 * @param {string} charge_type
 * @param {number} plan_id
 * @param {number} payment_id
 * @param {boolean} is_change
 */
export function newSubscriptionPlan(
	url,
	id,
	token,
	charge_type,
	plan_id,
	payment_id,
	is_change = false,
) {
	return axios.post(url + constants.NEW_SUBSCRIPTION, {
		id,
		token,
		charge_type,
		plan_id,
		payment_id,
		is_change,
	});
}

/**
 * Get subscription details
 * @param {number} id
 * @param {string} token
 */
export function subscriptionDetails(url, id, token) {
	return axios.get(url + constants.DETAILS_SUBSCRIPTION, {
		params: {
			id,
			token,
		},
	});
}

/**
 * Add a Provider's Cards
 * @param {number} id
 * @param {string} token
 * @param {string} card_holder
 * @param {number} card_number
 * @param {number} card_cvv
 * @param {number} card_expiration_month
 * @param {number} card_expiration_year
 */
export function addCard(
	url,
	id,
	token,
	card_holder,
	card_number,
	card_cvv,
	card_expiration_month,
	card_expiration_year,
) {
	return axios.post(url + constants.ADD_CARD, {
		id: id,
		token: token,
		card_holder: card_holder,
		card_number: card_number,
		card_cvv: card_cvv,
		card_expiration_month: card_expiration_month,
		card_expiration_year: card_expiration_year,
		terra_card: 0,
		is_provider: true,
	});
}

/**
 * List a Provider's Cards
 * @param {number} id
 * @param {string} token
 */
export function listCards(url, id, token) {
	return axios.get(url + constants.LIST_CARD, {
		params: {id, token},
	});
}

/**
 * Cancel a subscription
 * @param {number} id
 * @param {string} token
 * @param {number} subscription_id
 */
export function cancelSubscription(url, id, token, subscription_id) {
	return axios.post(url + constants.CANCEL_SUBSCRIPTION, {
		id,
		token,
		subscription_id,
	});
}

/**
 * Cancel a subscription
 * @param {number} lat
 * @param {number} lng
 */
export function plataformRequireSubscription(url,  id, token, lat, lng) {
	console.log(url + constants.GET_REQUIRED_PLANS,  id, token, lat, lng);
	return axios.get(url + constants.GET_REQUIRED_PLANS, {
		params: {
			id,
			token,
			lat,
			lng
		}
	});
}

/**
* Get the Settings from server
*/
export function getSettingsServer(url) {
	return axios.get(`${url}${constants.GET_SETTINGS}`, {
		params: {user_type: 'provider'},
	});
}
