'use strict';
// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Transitionable = require('famous/transitions/Transitionable');
var Node = require('famous/core/Node');

// Custom Framedata class, store all framedata in JSON
var Framedata = require ('./framedata.js');

// Boilerplate code to make your life easier
FamousEngine.init();
// initilize all the framedata
var fd = Framedata.init();
// Initialize with a scene; then, add a 'node' to the scene root
var theScene = FamousEngine.createScene();
var game = theScene.addChild();

// iterator for animation frames
var iterator = 0;

// listen for keypresses on the document
document.addEventListener('keydown', function(event) {
  game.onReceive(event.type, event);
}.bind(this));

// sets the game Node to process the keydown listener from above
game.onReceive = function(event, payload) {
  if(event==='keydown'){
    switch (payload.keyCode) {
      case 66:
        game.emit('sequence',payload);
        break;
      case 67:
        game.emit('reverseSequence',payload);
        break;
    }
  }
}

var boxNode = game.addChild();
boxNode.framedata = fd.framedata.test_box;
boxNode.setSizeMode('absolute', 'absolute')
    .setAbsoluteSize(160, 160)
    .setPosition(0,0,0);

var boxElement = new DOMElement(boxNode);
boxElement.setProperty('background-image', 'url(./assets/grid.png)');
boxElement.setContent('Click Me');
addAnimationComponent(boxNode);

function addAnimationComponent(char){
  var myComponent = {
    id: null,
    node: null,
    onMount: function (node) {
        this.id = node.addComponent(this);
        this.node = node;
    },
    onReceive: function (event, payload) {
      if(iterator>0){
        console.log("!!!!(uninteruptable) animation in progress!!!!");
      }
      else{
        this.node.framedata.active = this.node.framedata[event];
        var frames = this.node.framedata.active.frames;
        var duration=0;
        for(var x=0; x < frames.length; x++){
          duration += frames[x].ms;
        }
        this.node.animationTransitionable = new Transitionable(0);
        this.node.requestUpdate(this.id);
        this.node.animationTransitionable.from(0).to(frames.length, 'linear', duration, done);
      }
    },
    onUpdate: function() {
      if(this.node.animationTransitionable._state < 1) boxNode.framedata.sequence.frameIterator = 0;
      if(this.node.animationTransitionable._state < iterator+1 && this.node.animationTransitionable._state >= iterator && this.node.animationTransitionable.isActive()) {
        var animation = this.node.framedata.active;
        var frames = animation.frames;
        console.log('enetered valid animation state',frames[iterator],iterator,this.node.animationTransitionable._state);
        var forceMove = this.node.animationTransitionable.get();
        console.log('next state :', forceMove);
        boxElement.setProperty('background-position','-' + frames[iterator].x + 'px ' + '-' + frames[iterator].y + 'px')
        iterator++;
        this.node.requestUpdateOnNextTick(this.id);
        console.log('left valid state')
      }
      else if(this.node.animationTransitionable.isActive()) {
        console.log('enetered invalid state');
        console.log(this.node.animationTransitionable._state);
        var forceMove = this.node.animationTransitionable.get();
        console.log('next state :', forceMove);
        this.node.requestUpdateOnNextTick(this.id);
        console.log('left invalid state');
      }
    }
  };
  char.addComponent(myComponent);
  // Callback for animationTransitionable
  function done() {
    iterator = 0;
  }
}
