# Give and Take Game for xeejp
React + Redux with Webpack

## Installation
```
$ cd <your xee root>/experiments
$ git clone git@github.com:xeejp/give-and-take-game.git
$ cd give-and-take-game/
$ npm install
$ webpack
```
and insert  this lines into \<your xee root\>/config/experiments.exs
```exs:experiments.exs
experiment "TrustGame",
  file: "experiments/give-and-take-game/script.exs",
  host: "experiments/give-and-take-game/host.js",
  participant: "experiments/give-and-take-game/participant.js"
```
