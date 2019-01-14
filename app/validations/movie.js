import {
  validatePresence
} from 'ember-changeset-validations/validators';

export default {
  title: validatePresence(true),
  director: validatePresence(true),
  year: validatePresence(true),
  country: validatePresence(true),
};
