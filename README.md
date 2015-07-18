#Sprite Animation Component
> an example of how to create an animation component for a traditional css sprite

Sprite data is held in custom js file src/framedata.js. Data is stored in JSON in the format:
```JSON
  { 
   "character_name":{
      "animation_name":{
        "frames": [
          {x:0,y:0,ms:0}
        ],
        "frameIterator":0
      }
    }
  }
```   
Where 'frames' holds an array of objects that indicate the beginning x and y pixel of the frame in the sprite sheet and ms is the time in milliseconds for the frame to display (currently does not support variable frame rate; all ms values, even if different, are added together and the animation plays at a steady frame rate for the total duration).

#Install
```bash
$ git clone git@github.com:skaraman/sprite-animation-component.git
$ cd sprite-animation-component
$ famous dev
```

#Engine-Seed
> A seed project to get started with the famous engine

[![Build Status](https://travis-ci.org/Famous/engine-seed.svg?branch=master)](https://travis-ci.org/Famous/engine-seed)  [![Dependency Status](https://david-dm.org/famous/engine-seed.svg)](https://david-dm.org/famous/engine-seed) [![devDependency Status](https://david-dm.org/famous/engine-seed/dev-status.svg)](https://david-dm.org/famous/engine-seed#info=devDependencies)

---

###Installation

```bash
git clone https://github.com/Famous/engine-seed
cd engine-seed
# rm -rf .git && git init && git commit -m "Make it so" # optionally reset git history
npm i # install dependencies
```

---

###Development
Run the dev server with ```npm run dev```

Now the dev server should be running on localhost:1618

Run the linters with ```npm run lint```

Run All Tests with ```npm test```

---

###Need help?

Please join us on the "famous-community" slack.

Sign up --> http://slack.famous.org/signup

Join the discussion --> http://slack.famous.org/

There is a bunch of learning material at --> http://famous.org/learn

There are api docs at -->
http://famous.org/docs


Do you think this readme needs work? So do we! Feel free to send a PR!!!

---

###LICENSE

MIT
