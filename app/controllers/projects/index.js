import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  appName: 'Ember Twiddle Project',
  sortBy: 'number:asc',

  filteredItems: computed(
    'sortBy',
    'filterNumber',
    'filterName',
    'filterManager',
    'filterDate',
    'model.[]',
    function() {

      return this.model.filter((project) => {
        return (!this.filterNumber || project.number.includes(this.filterNumber))
          && (!this.filterName || project.name.includes(this.filterName))
          && (!this.filterManager || project.manager.includes(this.filterManager))
          && (!this.filterDate || project.date.includes(this.filterDate))
          ;
      })
    }),

  pagedItems: computed('filteredItems.[]', function() {
    return this.sortedItems.slice(0, 20);
  }),

  sortByArray: computed('sortBy', function() {
    return [this.sortBy]
  }),

  sortedItems: computed.sort('filteredItems', 'sortByArray'),

});
