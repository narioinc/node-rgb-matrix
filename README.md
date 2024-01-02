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
* Allows handling 2 or more canvas elements to create layers. Max 3 canvases work OK on a rpi 2 and 3B +. Rpi 4 and 5 may support more layers but not tested yet    
* Shapes and Animation only limited to your imagination. Have examples showing how to integrate with GSAP APIs for advances tweens and Easing
    * https://gsap.com/

* Still tries to maintain 60 fps as much as possible. Further Optimization are still possible if someone is willing to guide me.
* Works great from RPi 2 and above. Not tested with RPi Zero W 2. Other Linux boards may need a rebuild of the Node Canvas lib.  

# Run the demo
* ```git clone https://github.com/narioinc/node-rgb-matrix```
* run ``` npm install --save --build-from-source```
* RUN ``` sudo npm start ``` to start the server on port 3000 on all network interfaces.

# REST APIs
The express routes are evolving and currently we have the following endpoints

* ```/mode```: allows you to change different modes
* ```/demo```: allows you to play some demos


# TBD
* Try and Integrate Matter JS render engine with node canvas and konva to create advanced physics APIs for LED matrix displays. 
* Improve diplay FPS further with the way frames are dispatched 
* P5.JS Support in demo soon !! once i wrap my head around their Canvas wrapper. 

