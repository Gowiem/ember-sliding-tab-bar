import Ember from 'ember';

// Of course all the browsers have their own prefix...
// https://gist.github.com/stucox/5231211
// MutationObservers: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var BrowserMutationObserver = (function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for(var i=0; i < prefixes.length; i++) {
    if(prefixes[i] + 'MutationObserver' in window) {
      return window[prefixes[i] + 'MutationObserver'];
    }
  }
  return false;
}());

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['sliding-tab-bar'],

  setup: function() {
    // If MutationObserver are supported then we do our setup, otherwise
    // we set some CSS on the body and remove our tab-highlight element.
    if (BrowserMutationObserver) {
      this.setupMutationObserver();
      this.setupInitialPosition();
    } else {
      this.$('.tab-highlight').remove();
      // TODO: remove hardcoded color
      Ember.$('<style>ul.tab-bar li a.active { border-bottom: solid 4px #f04123; }</style>').appendTo('body');
    }
  }.on('didInsertElement'),

  setupMutationObserver: function() {
    var $liElements = this.$('li').not('.tab-highlight'),
        self = this;
    
    this.observer = new BrowserMutationObserver(this.mutationObserverCallback.bind(this));

    // Watch our liElement's anchor tag attributes for changes.
    $liElements.each(function() {
      var $child = Ember.$(this).find('a');
      if ($child.get(0) !== null) {
        self.observer.observe($child.get(0), { attributes: true });
      }
    });
  },

  setupInitialPosition: function() {
    var $activeEl = this.$('a.active').parent();
    this.moveHighlightEl($activeEl);
  },

  disconnectObserver: function() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }.on('willDestroyElement'),

  moveHighlightEl: function($activeEl) {
    var $tabHighlightEl = this.$('.tab-highlight');

    if ($activeEl.hasClass('deactivated')) { return; }

    if ($activeEl.exists()) {
      $tabHighlightEl.css({ 'left': $activeEl.position().left,
        'width': $activeEl.width() });
    }
  },

  mutationObserverCallback: function(mutations) {
    var self = this; // 'this' is the component instance
    mutations.forEach(function(mutation) {
      var $el = Ember.$(mutation.target),
      $parent;

      // If we just added the 'active' class then move the highlight element
      if (mutation.attributeName === "class" && $el.hasClass('active')) {
        $parent = $el.parent();
        self.moveHighlightEl($parent);
      }
    });
  }
});