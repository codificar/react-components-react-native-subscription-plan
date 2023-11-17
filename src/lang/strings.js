import {NativeModules, Platform} from 'react-native';

let strings = require('./pt-BR.json')

const deviceLanguage =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier;


  if (deviceLanguage === 'en_US' || deviceLanguage.includes('en')) {
    strings = require('./en.json');
  } else if (deviceLanguage === 'es_PY' || deviceLanguage.includes('es')) {
    strings = require('./es-PY.json');
  }

export default strings;
