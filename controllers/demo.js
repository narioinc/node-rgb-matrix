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

      utils.publish(ctx, rgbmatrix)
      await utils.wait(99999999);
    }
    
}

module.exports = demo