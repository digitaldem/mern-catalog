const __NAME__ = (process.env.NAME || '').replace(/-/g, ' ');
const __VERSION__ = process.env.VERSION || '';
const __ENVIRONMENT__ = (process.env.NODE_ENV || '').toLowerCase();
const __DEBUG__ = (__ENVIRONMENT__ !== 'production');
const __API_URL__ = `//127.0.0.1:${(process.env.PORT || '8080')}/api/`;
const __BUGSNAG_KEY__ = '';
const __GA_ACCOUNT_ID__ = '';


export {
  __NAME__,
  __VERSION__,
  __ENVIRONMENT__,
  __DEBUG__,
  __API_URL__,
  __BUGSNAG_KEY__,
  __GA_ACCOUNT_ID__
};
