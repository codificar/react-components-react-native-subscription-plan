/**
 * Funtion that check if request was a success or not.
 * @param {*} json
 */
export function isSuccess(json, navigate = null) {
	if (json.success == true) {
		return true;
	} else {
		showErrorMessage(json, navigate);
		return false;
	}
}

/**
 * Receive a JSON and print a Toast Error Message to user
 * @param {*} json
 */
export function showErrorMessage(json, navigate) {

}

/**
 * Show Toast to Android and iOS
 * @param {Toast Message} msg
 * @param {DURATION} duration
 */
export function showToast(msg, duration) {
	if (typeof msg !== 'string') {
		if (typeof msg === null) {
			msg = '';
		} else {
			msg = JSON.stringify(msg);
		}
	}
}
