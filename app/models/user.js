import DS from 'ember-data';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

const { attr } = DS;

export default DS.Model.extend({
  email: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),

  name: computed('firstName', 'lastName', function() {
    let { firstName, lastName } = this;

    if (isEmpty(firstName) && isEmpty(lastName)) {
      return null;
    }

    if (isEmpty(firstName)) {
      return lastName
    }

    if (isEmpty(lastName)) {
      return firstName;
    }

    return `${firstName} ${lastName}`;
  }),
});
