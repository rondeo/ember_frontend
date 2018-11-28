import Route from '@ember/routing/route';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from 'grizzzel-frontend/validations/user';

export default Route.extend({
  model() {
    return new Changeset({}, lookupValidator(UserValidations), UserValidations);
  }
});
