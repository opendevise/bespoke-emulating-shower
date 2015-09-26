var bespoke = require('bespoke'),
  backdrop = require('bespoke-backdrop'),
  bullets = require('bespoke-bullets'),
  classes = require('bespoke-classes'),
  forms = require('bespoke-forms'),
  fullscreen = require('bespoke-fullscreen'),
  hash = require('bespoke-hash'),
  nav = require('bespoke-nav'),
  overview = require('bespoke-overview'),
  scale = require('bespoke-scale');

bespoke.from('.deck', [
  classes(),
  nav(),
  fullscreen(),
  backdrop(),
  // NOTE zoom-based scaling produces slightly different results than scale transform,
  scale('transform'),
  overview({ margin: 300, autostart: true, title: true, numbers: true }),
  bullets('.bullet'),
  hash(),
  forms()
]);

require('prism');
