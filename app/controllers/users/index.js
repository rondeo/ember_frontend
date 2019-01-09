import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  appName: 'Ember Twiddle User',
  sortBy: 'firstName:asc',

  filteredItems: computed(
    'sortBy',
    'filterFirstName',
    'filterLastName',
    'filterCity',
    'filterZipCode',
    'filterFisatLevel',
    'model.[]',
    function() {

    return this.model.filter((user) => {
      return (!this.filterFirstName || user.firstName.includes(this.filterFirstName))
        && (!this.filterLastName || user.lastName.includes(this.filterLastName))
        && (!this.filterCity || user.city.includes(this.filterCity))
        && (!this.filterZipCode || user.zipCode.includes(this.filterZipCode))
        ;
    })
  }),

  pagedItems: computed('filteredItems.[]', function() {
    //return this.filteredItems.slice(0, 20);      // number of users
    return this.sortedItems.slice(0, 20);
  }),

  sortByArray: computed('sortBy', function() {
    return [this.sortBy]
  }),

  sortedItems: computed.sort('filteredItems', 'sortByArray'),

});
