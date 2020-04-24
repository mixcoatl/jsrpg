import Example from './main_example.js';
import Renderer from './render/renderer.js';

// Keyboard management.
var keysDown = {};
document.body.addEventListener('keydown', function(e) {
  keysDown[e.keyCode] = true;
});
document.body.addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
});

// Renderer setup.
var context = canvas.getContext('2d');
var renderer = new Renderer(context);
renderer.pushRenderable(new Example());