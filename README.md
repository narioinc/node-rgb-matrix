# node-rgb-matrix
A nodejs express server to control RGB Matrix based on HUB75 connector

The project uses the excellent library by Alex Eden here: https://github.com/alexeden/rpi-led-matrix with a MAJOR addition.

I have found a way to easily use the JS Canvas APIs to write clamped arrays to the matrix. By exporting canvas to clamped arrays and then writing the array to the matrix, we now HAVE 
THE FULL POWER OF THE JS CANVAS APIS at our disposale. 

# Run the demo
* ```git clone https://github.com/narioinc/node-rgb-matrix```
* run ``` npm install --save ```

# REST APIs
The express routes are evolving and currently we have the following endpoints

* ```/mode```: allows you to change different modes
* ```/demo```: allows you to play some demos



