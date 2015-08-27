var bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  fullscreen = require('bespoke-fullscreen'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  overview = require('bespoke-overview'),
  bullets = require('bespoke-bullets'),
  hash = require('bespoke-hash'),
  forms = require('bespoke-forms');

bespoke.from('.deck', [
  classes(),
  keys(),
  touch(),
  fullscreen(),
  backdrop(),
  // NOTE zoom-based scaling produces slightly different results scale(),
  scale('transform'),
  overview({ margin: 100, autostart: true, title: true, numbers: true }),
  bullets('.bullet'),
  hash(),
  forms()
]);

require('prism');
