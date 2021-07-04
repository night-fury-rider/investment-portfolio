import UV_SETTINGS from './uv_settings.constants';

const updateLanguage = (language: any) => {
  return {
    type: UV_SETTINGS.UPDATE_LANGUAGE,
    data: language
  }
}

const updateCurrency = (currency: any) => {
  return {
    type: UV_SETTINGS.UPDATE_CURRENCY,
    data: currency
  }
}

const updateLocale = (locale: any) => {
  return {
    type: UV_SETTINGS.UPDATE_LOCALE,
    data: locale
  }
}

export {
  updateLanguage,
  updateCurrency,
  updateLocale
}
