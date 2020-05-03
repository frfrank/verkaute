import Vue from 'vue';
import {
  ValidationProvider, ValidationObserver, extend, configure,
} from 'vee-validate';
import { required, email, confirmed } from 'vee-validate/dist/rules';
import { i18n } from '@/config/i18n';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', required);
extend('email', email);
extend('confirmed', confirmed);

configure({
  // eslint-disable-next-line no-underscore-dangle
  defaultMessage: (_, values) => i18n.t(`VALIDATION.${values._rule_}`.toUpperCase(), { field: values._field_ }),
});
