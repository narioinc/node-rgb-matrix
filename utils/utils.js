const fs = require("fs");


utils = {

  /***
   *  WAIT FUNCTION TO ADD ARBITRARY DELAYS TO CODE
   */

  wait: function (t) {
    new Promise(ok => setTimeout(ok, t))
  },

  /***
   *  PUBLISH FUNCTION TO PUBLISH A CONTEXT ctx to THE RGB MATRIX
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

  /**
   * Publish a single Konvba Layer object to the RGBMatrix
   * 
   * @param {*} layer 
   * @param {*} rgbmatrix 
   */
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
  /**
   * Publish a multiple Konva Layers to the RGBMatrix
   * 
   * @param {*} layer 
   * @param {*} rgbmatrix 
   */
  publishLayers: function (layers, rgbmatrix) {
    var w = rgbmatrix.width();
    var h = rgbmatrix.height();
    var ctxs = []
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

  /**
   * Function to export the current frame to a PNG file
   * File saved with currentr epoch timestamp
   * @param {*} canvas 
   */
  exportCanvas: function (canvas) {
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./" + Date.now() + ".png", buffer);
  },

  /**
   * Fucntion to get the layers of a Konva Stage object
   * if no layers are found, a single layer is added and returned
   * @param {*} stage 
   * @returns 
   */
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