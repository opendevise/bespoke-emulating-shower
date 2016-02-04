var bespoke = require('bespoke'),
  bullets = require('bespoke-bullets'),
  classes = require('bespoke-classes'),
  //cursor = require('bespoke-cursor'),
  //forms = require('bespoke-forms'),
  fullscreen = require('bespoke-fullscreen'),
  hash = require('bespoke-hash'),
  nav = require('bespoke-nav'),
  overview = require('bespoke-overview'),
  scale = require('bespoke-scale'),
  title = require('bespoke-title');

bespoke.from('.deck', [
  classes(),
  nav(),
  fullscreen(),
  // NOTE zoom-based scaling produces slightly different results than scale transform
  scale('transform'),
  overview({ margin: 300, autostart: true, title: true, numbers: true }),
  bullets('.build,.build-items>*:not(.build-items)'),
  title(),
  // enable forms() if you have form elements in your slides
  //forms(),
  // enable cursor() to automatically hide the cursor when presenting
  //cursor(),
  hash()
]);
