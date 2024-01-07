const fs = require("fs");


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
  publish: function (ctx, rgbmatrix) {
    var w = rgbmatrix.width();
    var h = rgbmatrix.height();

    var rgba = ctx.getImageData(0, 0, w, h).data
    var newArray = new Uint8ClampedArray(w * h * 3);
    for (var i = 0, counter = 0; i < rgba.length; i++) {
      if (i % 4 < 3) {
        newArray[counter++] = rgba[i]
      }
    }
    const image = Buffer.from(newArray);
    rgbmatrix.drawBuffer(image, w, h).sync();
  },
  publishLayer: function(layer, rgbmatrix){
    var ctx = layer.getContext()
    var rgba = ctx.getImageData(0, 0, w, h).data
    var newArray = new Uint8ClampedArray(w * h * 3);
    for (var i = 0, counter = 0; i < rgba.length; i++) {
      if (i % 4 < 3) {
        newArray[counter++] = rgba[i]
      }
    }
    const image = Buffer.from(newArray);
    rgbmatrix.drawBuffer(image, w, h).sync();
  },
  publishLayers: function (layers, rgbmatrix) {
    var w = rgbmatrix.width();
    var h = rgbmatrix.height();
    var ctxs = []
    //console.log("Number of published layers: " + layers.length )
    for (layer of layers) {
      ctxs.push(layer.getContext())
    }

    for (ctx of ctxs) {
      var rgba = ctx.getImageData(0, 0, w, h).data
      var newArray = new Uint8ClampedArray(w * h * 3);
      for (var i = 0, counter = 0; i < rgba.length; i++) {
        if (i % 4 < 3) {
          newArray[counter++] = rgba[i]
        }
      }
      const image = Buffer.from(newArray);
      rgbmatrix.drawBuffer(image, w, h).sync();
    }

  },
  clearLayers: function(layers, rgbmatrix){
    var w = rgbmatrix.width();
    var h = rgbmatrix.height();

    for(layer of layers){
      const context = layer.getContext();
      context.clearRect(0, 0, w, rgbmatrix.height());
      var rgba = context.getImageData(0, 0, w, h).data
      var newArray = new Uint8ClampedArray(w * h * 3);
      for (var i = 0, counter = 0; i < rgba.length; i++) {
        if (i % 4 < 3) {
          newArray[counter++] = rgba[i]
        }
      }
      const image = Buffer.from(newArray);
      rgbmatrix.drawBuffer(image, w, h).sync();
    }
  },
  exportCanvas: function (canvas) {
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./" + Date.now() + ".png", buffer);
  },
  getLayers: function (stage) {
    var layers = stage.getLayers();
    if (layers.length <= 0) {

      var layer = new Konva.Layer();
      stage.add(layer)
      layers = stage.getLayers();
    }
    return layers;
  }
}

module.exports = utils