# Ember-sliding-tab-bar
[![Ember Observer Score](http://emberobserver.com/badges/ember-sliding-tab-bar.svg)](http://emberobserver.com/addons/ember-sliding-tab-bar)

ember-sliding-tab-bar shows the active tab by using a sliding bottom border which reacts to clicks and route changes.

It uses the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) DOM API to watch for the `active` class on it's child tabs and moves a sliding 'highlight tab' to that location. When MutationObservers are [not available](http://caniuse.com/#search=mutation) (mainly IE10 and below) it falls back to plain CSS.

<img src="https://i.imgur.com/gjIR2gL.gif" alt="sliding tab-bar example" />

### Installation

```
$ npm install --save-dev ember-sliding-tab-bar
```

### Usage

```
{{#sliding-tab-bar}}
  <li>{{#link-to '1'}}Route 1{{/link-to}}</li>
  <li>{{#link-to '2'}}Route 2{{/link-to}}</li>
  {{!-- ... --}}
{{/sliding-tab-bar}}
```

### Configuration Styles

The tab highlight size/color is the thing you'll most likely want to change. To do so, add the following to your CSS:

```
.sliding-tab-bar li.tab-highlight {
  border-bottom: solid ${height of highlight}px ${highlight color};
}
```

If you need to overwrite anything else just checkout [vendor/sliding-tab-bar.css](https://github.com/Gowiem/ember-sliding-tab-bar/blob/master/vendor/sliding-tab-bar.css) as the styles are fairly basic.




