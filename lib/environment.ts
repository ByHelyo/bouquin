export const IS_FIREFOX: boolean = /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(
  navigator.userAgent,
);
