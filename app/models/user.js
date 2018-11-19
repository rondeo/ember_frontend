import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  email: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
});
