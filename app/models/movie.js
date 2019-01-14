import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  title: attr('string'),
  director: attr('string'),
  country: attr('string'),
  year: attr('number')
});
