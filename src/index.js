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


// listen for keypresses on the document
document.addEventListener('keydown', function(event) {
    game.onReceive(event.type, event);
}.bind(this));

// sets the game Node to process the keydown listener from above
// and fire an emit() to all children,
// emit event is sent based on which button was pressed
game.onReceive = function(event, payload) {
    switch(event){
        case 'keydown':
            switch (payload.keyCode) {
                case 66:
                    game.emit('sequence',payload);
                break;
                case 67:
                    game.emit('reverseSequence',payload);
                break;
                case 65:
                    game.emit('sequence_timed',payload);
                break;
            }
        break;
        case 'click':
            payload.interupt = true;
            game.emit('sequence',payload)
        break;
    }
}

// creating our 'character', in this case it's just a box
// that has 60 animation frames
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

boxNode.addUIEvent('click');

addAnimationComponent(boxNode);

// function for adding animation component to a 'character'
function addAnimationComponent(char){
    var myComponent = {
        id: null,
        node: null,
        // Callback for animationTransitionable, since our transitionable will be done
        // we want to reset our iterator for the next animation
        done: function(node) {
            if( typeof(node.framedata.active) == "null"){
                node
            }
            node.framedata.active.frameIterator = 0;
            node.framedata.active.msTimer = 0;
            node.framedata.active = null;
            node.animationTransitionable.halt();
            console.log("Done ran");
        },
        onMount: function (node) {
            this.id = node.addComponent(this);
            this.node = node;
        },
        // the character Node receieves an event from the game Node,
        // checks to see if the iterator is active,
        // if not, proceeds to create our animation Transitionable,
        // sets the 'state' which we want to go to as the total number of frames
        // sets the duration to be the total of all the millisecond's for all frames,
        // and requests an update!
        onReceive: function (event, payload) {
            if (this.node.framedata[event]) {
                //confirm or set active, if there's already an active animation
                //then do not set this event as the active one
                if(!this.node.framedata.active){
                    this.node.framedata.active = this.node.framedata[event];
                    this.node.framedata.active.event = event;
                }
                //if active.frameIterator is less than 1, which indicates that the
                //animation is not ongoing, and is instead in 'begin state'
                //it's necessary to do this, because above we set an active
                //animation, so there will ALWAYS be an active aimation at this point
                //so we check the iterator to see it is truely active, or just been set above
                if (this.node.framedata.active.frameIterator < 1 || payload.interupt) {
                    //else, the anamition must be ongoing if frameIterator has been increased
                    //so should we interupt this animation? probably only if the requesting
                    //event has some kind of interupt 'power', aka 'flinch' animation when
                    //character is hit
                    if(payload.interupt){
                        if(this.node.animationTransitionable) this.node.animationTransitionable.halt();
                        this.node.framedata.active.frameIterator = 0;
                        //console.log('you interrupted the animation!');
                    }
                    this.node.framedata.active = this.node.framedata[event];
                    this.node.framedata.active.event = event;
                    var frames = this.node.framedata.active.frames;
                    var duration=0;
                    // determine the duration of this animation,
                    for(var x=0; x < frames.length; x++){
                        duration += frames[x].ms;
                    }
                    this.node.animationTransitionable = new Transitionable(0);
                    this.node.requestUpdate(this.id);
                    this.node.animationTransitionable.from(0).to(duration, 'linear', duration, this.done, null, this.node);
                }else{
                    //console.log('animation is uninterruptible via this command!');
                }
            }
        },
        // update was requested, so we check the current state of our Transitionable
        // we want to fit our animation into each state of the transitionable, so that
        // state = 1 would be the first animation, state = 2 is the second, so on so forth,
        // we also use our iterator so we know when we have actually entered a valid state
        // and drew our animation frame, otherwise we enter an invalid state and wait for a valid one
        onUpdate: function() {
            if(this.node.framedata.active){
                var animation = this.node.framedata.active;
                var frames = animation.frames;
                var transition = this.node.animationTransitionable;

                if(transition._state < 1){
                    animation.frameIterator = 0;
                    animation.msTimer = 0;
                }
                if(animation.frameIterator < frames.length){
                    if(transition._state < animation.msTimer + frames[animation.frameIterator].ms
                    && transition._state >= animation.msTimer
                    && animation != null) {
                        console.log('entered valid animation state',
                            frames[animation.frameIterator],
                            animation.frameIterator,
                            frames[animation.frameIterator].ms,
                            transition._state);
                        boxElement.setProperty('background-position','-' + frames[animation.frameIterator].x
                            + 'px ' + '-' + frames[animation.frameIterator].y + 'px')
                        animation.msTimer += frames[animation.frameIterator].ms;
                        animation.frameIterator++;
                        var forceMove = transition.get();
                        console.log('next state :', forceMove);
                        this.node.requestUpdateOnNextTick(this.id);
                        console.log('left valid state')
                    }
                    else if(transition.isActive()) {
                        console.log('enetered invalid state');
                        console.log(transition._state);
                        var forceMove = transition.get();
                        console.log('next state :', forceMove);
                        this.node.requestUpdateOnNextTick(this.id);
                        console.log('left invalid state');
                    }
                }else if(animation.frameIterator >= frames.length){
                    if(transition.isActive()){
                        transition.get();
                        this.node.requestUpdateOnNextTick(this.id);
                    }
                }
            }
        }
    };
    char.addComponent(myComponent);
}
