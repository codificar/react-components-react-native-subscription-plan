export const LOADING_COLOR = '#436988';
/**
 * Subscription plans
 */
export const LIBS_URL = '/api/libs';
export const HOST_PROVIDER_URL = '/provider';
export const GET_PLANS = LIBS_URL + HOST_PROVIDER_URL + '/plans';
export const GET_REQUIRED_PLANS = LIBS_URL + HOST_PROVIDER_URL + '/plans/required_plans';
export const NEW_SUBSCRIPTION = LIBS_URL + HOST_PROVIDER_URL + '/update_plan';
export const DETAILS_SUBSCRIPTION =
	LIBS_URL + HOST_PROVIDER_URL + '/subscription_details';
export const CANCEL_SUBSCRIPTION =
	LIBS_URL + HOST_PROVIDER_URL + '/cancel_subscription';
export const ADD_CARD = '/api/add_card';
export const LIST_CARD = '/api/list_provider_cards';
export const GET_SETTINGS = '/application/settings';