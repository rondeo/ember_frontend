import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  number: attr('number'),
  name: attr('string'),
  manager: attr('string'),
  date: attr('string'),
  description: attr('text'),
  userId: attr('number'),
});
