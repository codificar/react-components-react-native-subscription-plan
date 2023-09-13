import {NativeModules, Platform} from 'react-native';

var strings = require('./pt_BR.json');

const deviceLanguage =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier;

		console.log(deviceLanguage)
if (deviceLanguage == 'en_US') {
	strings = require('./en.json');
} else if (deviceLanguage == 'es_PY' || 'es-PY') {
	strings = require('./es-PY.json');
}

export default strings;
