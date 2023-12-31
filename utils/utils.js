utils = {
    
    /***
     *  WAIT FUNCTION TO ADD ARBITRARY DELAYS TO CODE
     */
    
    wait: function (t) { 
        new Promise(ok => setTimeout(ok, t)) 
    },

    /***
     *  PUBLISH FUCNTION TO PUBLISH A CONTEXT ctx to THE RGB MATRIX
     *  THIS WILL DRAW WHATEVER IS THERE IN THE CANVAS ON TO THE 
     *  RGB MATRIX
     */
    publish: function(ctx, rgbmatrix){
      var w = rgbmatrix.width();
      var h = rgbmatrix.height();

      var rgba = ctx.getImageData(0, 0, w, h).data
      var newArray = new Uint8ClampedArray(w*h*3);
      for(var i=0, counter=0; i<rgba.length; i++){
        if(i % 4 < 3){
          newArray[counter++] = rgba[i]
        }
      }
      const image = Buffer.from(newArray);
      rgbmatrix.drawBuffer(image, w,h).sync();
    }
}

module.exports = utils