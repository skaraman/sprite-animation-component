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
// and fire an emit() to all children,
// emit event is sent based on which button was pressed
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

// creating our 'character', in this case it's just a box
// that has 66 animatino frames
var boxNode = game.addChild();
boxNode.framedata = fd.framedata.test_box;
boxNode.setSizeMode('absolute', 'absolute')
    .setAbsoluteSize(160, 160)
    .setPosition(0,0,0);

// adding the actual dom-element to the node
// it's what shows our sprite image on our node!
var boxElement = new DOMElement(boxNode);
boxElement.setProperty('background-image', 'url(./assets/grid.png)');
boxElement.setContent('Click Me');
addAnimationComponent(boxNode);

// function for adding animation component to a 'character'
function addAnimationComponent(char){
  var myComponent = {
    id: null,
    node: null,
    onMount: function (node) {
        this.id = node.addComponent(this);
        this.node = node;
    },
    // the character Node receieves an event from the game Node
    // checks to see if the iterator is active
    // if not, proceeds to create our animation Transitionable
    // sets the 'state' which we want to go to as the total number of frames
    // sets the duration to be the total of all the millisecond's for all frames
    // and requests an update!
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
    // update was requested, so we check the current state of our Transitionable
    // we want to fit our animation into each state of the transitionable, so that
    // state = 1 would be the first animation, state = 2 is the second, so on so forth,
    // we also use our iterator so we know when we have actually entered a valid state
    // and drew our animation frame, otherwise we enter an invalid state and wait for a valid one
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
  // Callback for animationTransitionable, since our transitionable will be done
  // we want to reset our iterator for the next animation
  function done() {
    iterator = 0;
  }
}
