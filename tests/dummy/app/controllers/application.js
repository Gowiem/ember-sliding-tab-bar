import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    back: function() {
      var currentRouteName = this.get('currentRouteName');

      if (currentRouteName === '1') {
        return;
      } else {
        this.transitionToRoute((parseInt(currentRouteName, 10) - 1).toString());
      }
    }, 
    continue: function() {
      var currentRouteName = this.get('currentRouteName');

      if (currentRouteName === '4') {
        return;
      } else {
        this.transitionToRoute((parseInt(currentRouteName, 10) + 1).toString());
      }
    }
  }
});