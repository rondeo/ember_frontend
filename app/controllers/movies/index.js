import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  appName: 'Ember Twiddle Movie',
  sortBy: 'title:asc',

  filteredItems: computed(
    'sortBy',
    'filterTitle',
    'filterYear',
    'filterDirector',
    'filterCountry',
    'model.[]',
    function() {
      return this.model.filter((movie) => {
        return (!this.filterTitle || movie.title.includes(this.filterTitle))
          && (!this.filterYear || movie.year >= this.filterYear)
          && (!this.filterDirector || movie.director.includes(this.filterDirector))
          && (!this.filterCountry || movie.country.includes(this.filterCountry))
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
