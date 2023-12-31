var utils = require('../utils/utils')
const fs = require("fs");

demo = {
    d0: function(rgbmatrix){
        rgbmatrix.clear().sync()
    },
    d1: async function(rgbmatrix){
        
            rgbmatrix
              .clear() // clear the display
              .brightness(50)
              //.fgColor(0x0000ff) // set the active color to blue
              //.fill()
              .fgColor(0xffff00) // set the active color to yellow
              // draw a yellow circle around the display
              .drawCircle(rgbmatrix.width() / 2, rgbmatrix.height() / 2, rgbmatrix.width() / 2 - 1)
              // draw a yellow rectangle
              .drawRect(
                rgbmatrix.width() / 4,
                rgbmatrix.height() / 4,
                rgbmatrix.width() / 2,
                rgbmatrix.height() / 2
              )
              .sync();
              await utils.wait(9999999999);
            
    },
    d2: async function(rgbmatrix, canvas){
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = "#ff0000";
      //ctx.fillText('Awesome!', 0, 0)
      //ctx.fillRect(0, 0, 10, 10);
      ctx.font = "20px Arial";
      ctx.rotate(20 * Math.PI / 180);
      ctx.fillText("Hello World", 0, 0);
      var w = rgbmatrix.width();
      var h = rgbmatrix.height();
      
      const buffer = canvas.toBuffer("image/png");
      //fs.writeFileSync("./"+Date.now()+".png", buffer);

      var rgba = ctx.getImageData(0, 0, w, h).data
      var newArray = new Uint8ClampedArray(w*h*3);
      for(var i=0, counter=0; i<rgba.length; i++){
        if(i % 4 < 3){
          newArray[counter++] = rgba[i]
        }
      }
      for(var j=0; j<100; j++){
        console.log(newArray[j])
      }
      const image = Buffer.from(newArray);
      rgbmatrix.drawBuffer(image, w,h).sync();
      await utils.wait(99999999);
    }
    
}

module.exports = demo