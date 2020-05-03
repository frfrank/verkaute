import Vue from 'vue';
import VueI18n from 'vue-i18n';
import defaultMessages from '@/locales/es.json';

const defaultLanguage = 'es';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || defaultLanguage,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || defaultLanguage,
  messages: {
    [defaultLanguage]: defaultMessages,
  },
});

const loadedLanguages = [defaultLanguage]; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export async function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(lang);
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  try {
    const messages = await import(/* webpackChunkName: "lang-[request]" */ `../locales/${lang}.json`);
    i18n.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  } catch (error) {
    return Promise.resolve(loadedLanguages[0]);
  }
}
