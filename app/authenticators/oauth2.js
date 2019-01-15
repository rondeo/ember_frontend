import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: 'http://127.0.0.1:8000/api/login'
});
