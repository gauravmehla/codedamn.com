# codedamn.com
This is the official repository of codedamn.com, i.e. the contents you see on codedamn.com are directly fetched from the master branch of this repo. Feel free to contribute! We appreciate contributions from the community!

# How codedamn is built
codedamn is built on the top of Node v8.9, Express Framework, MongoDB, Mongoose and TypeScript

# How To Contribute?

## Cloning the project
1. Fork this repo
2. Run `git clone https://github.com/<YOUR_NICK>/codedamn.com`
3. Run the following commands on the terminal
```
For Ubuntu/Mac users
export codedamn_cookieSecret=SOME_RANDOM_STRING // you can generate your own key as well. Generate here: https://www.google.com/recaptcha/admin#list
export codedamn_reCAPTCHAsecret=SOME_RANDOM_KEY // any string would work
export codedamn_captchSiteKey=6Lel8U8UAAAAAPZlTTEo6LRv2H59m-uNcuJQudAX

For Windows users
set codedamn_cookieSecret=SOME_RANDOM_STRING // you can generate your own key as well. Generate here: https://www.google.com/recaptcha/admin#list
set codedamn_reCAPTCHAsecret=SOME_RANDOM_KEY // any string would work
set codedamn_captchSiteKey=6Lel8U8UAAAAAPZlTTEo6LRv2H59m-uNcuJQudAX
```
4. Run `npm i` in the folder
5. This project uses `debug` module. To show all debug messages, in your terminal, write: `export DEBUG="cd:*"` and hit enter.
6. Install typescript by writing these 2 lines in your terminal:
```
npm i -g typescript
npm i -g ts-node
```
7. Make sure to start your mongodb server by writing `sudo mongod` in your terminal if your mongodb server is not running. (Check by writing `mongo` in terminal, if you get mongo shell, then your mongodb is running)
8. I recommend using [Robo3T Mongo Client](https://robomongo.org/) for GUI working with DB.
9. Once everything is done, run `nodemon` command which will pick up configs from supplied `nodemon.json` and `tsconfig.json` files and setup live reloading for `.ts` code.

## Instructions
1. The site uses TypeScript to enforce proper JavaScript code. [Give it a look](https://www.youtube.com/watch?v=hADI92zCIvE&list=PLYxzS__5yYQkX-95LHG5EDxPj3tVvVmRd) if you need an intro to TypeScript
2. Please make sure your pull request is compatible with the flow and code structure of the overall site.
3. Use tabs and not spaces :)
4. Use curly brace on the same line like `function damnit() {` :)

## Start Contributing!
Please check the issues tab for available issues you can work on and be a contributor to codedamn.com!

Cheers!

</>