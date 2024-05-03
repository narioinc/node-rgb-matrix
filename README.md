![alt text](https://raw.githubusercontent.com/narioinc/node-rgb-matrix/main/header.png)

# node-rgb-matrix
A nodejs express server to control RGB Matrix based on HUB75 connector

The project uses the excellent library by Alex Eden here: https://github.com/alexeden/rpi-led-matrix with a MAJOR addition.

I have found a way to easily use the JS Canvas APIs to write clamped arrays to the matrix. By exporting canvas to clamped arrays and then writing the array to the matrix, we now HAVE 
THE FULL POWER OF THE JS CANVAS APIS at our disposale. 

# Whats new !!
* Uses the JS canvas APIs from Konva and Node Canvas package to create powerful drawing APis for the 
RGB matrix 
    * https://github.com/konvajs/konva
    * https://github.com/Automattic/node-canvas
    * Ensure that you build node-canvas from source if running on anything other than x86 chip arch
* Allows handling 2 or more canvas elements to create layers. Max 3 canvases work OK on a rpi 2 and 3B +. Rpi 4 and 5 may support more layers but not tested yet    
* Shapes and Animation only limited to your imagination. Have examples showing how to integrate with GSAP APIs for advances tweens and Easing
    * https://gsap.com/

* Still tries to maintain 60 fps as much as possible. Further Optimization are still possible if someone is willing to guide me.
* Works great from RPi 2 and above. Tested with RPi Zero W 2, see the specific section on Rpi Zero 2W below. Other Linux boards may need a rebuild of the Node Canvas lib.
* Integrates with Matterjs for cool physics stuff..see Demos  

# Dependencies
Before running the node installation, please ensure the following packages are installed (this is on any debian system, for your package manager, please adjust the command accordingly

``` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ```

# Run the demo
* ```git clone https://github.com/narioinc/node-rgb-matrix```
* run ``` npm install --save --build-from-source```
* RUN ``` sudo npm start ``` to start the server on port 3000 on all network interfaces.

## Note for Rpi Zero 2W users
* Change the version of the rpi-rgb-matrix library to v 1.11.1. tested on rpi zero 2w to work. v1.12, 1.13 and 1.14 get stuck for a long time during compilation. Change to ```"rpi-led-matrix": "1.11.1"``` in package.json. You can try v1.12.2 or above if you feel brave !!
* Ensure that you can run npm install like so ```npm install --foreground-scripts --loglevel verbose```
* Something about the --foreground-scripts option makes the nodegyp steps work without getting stuck on the zero 2w. Thanks to @riffnshred for bringing this to my notice.
* Compilation on the zero 2w does take a lot of time. Please be patient !! It took me excess of > 20 minutes to compile the nodejs c bindings. No issues on Rpi 3 and newer.  

# REST APIs
The express routes are evolving and currently we have the following endpoints

* ```/mode```: allows you to change different modes
* ```/demo```: allows you to play some demos


# TBD
* Improve diplay FPS further with the way frames are dispatched 
* P5.JS Support in demo soon !! once i wrap my head around their Canvas wrapper. 

