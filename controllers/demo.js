var utils = require('../utils/utils')
const gsap = require('gsap')
var CRender = require('../utils/render')
const Matter = require("matter-js");

demo = {
  
  /**
   * Simple Demo to clear the matrix display
   * @param {*} rgbmatrix 
   */
  d0: function (rgbmatrix) {
    rgbmatrix.clear().sync()
  },

  /**
   * Simple Demo to show a circle and rect 
   * using the RGBMatrix APIs
   */
  d1: async function (rgbmatrix) {

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

  /**
   * Advanced Demo to showcase writing text with off the shelf
   * Fonts instead of pixel fonts limitation of the RGBMatrix APIs 
   * @param {*} rgbmatrix 
   * @param {*} stage 
   */
  d2: async function (rgbmatrix, stage) {
    var layers = utils.getLayers(stage)
    var ctx = layers[0].getContext();
    ctx.fillStyle = "#ff0000";
    ctx.font = "20px Arial";
    //ctx.rotate(20 * Math.PI / 180);
    ctx.fillText("Hello World", 0, 0);

    utils.publishLayers(layers, rgbmatrix)
    await utils.wait(99999999);
  },

  /**
   * Advanced Demo showcasing GSAP animation capabilities
   *  on the RGBMAtrix. Uses Node canvas for Drawing shapes
   */
  d3: async function (rgbmatrix, stage) {
    var layers = utils.getLayers(stage)
    var ctx = layers[0].getContext();
    ctx.fillStyle = "blue";
    let position = { x: 0, y: 0 };
    let style = { color: "red" }
    //gsap.gsap.registerPlugin(CSSPlugin)
    gsap.gsap.to(position, {
      x: 40,
      y: 40,
      duration: 10,
      repeat: 2,
      ease: "elastic.out(1,0.3)",
      //yoyo: true,
      // unlike DOM elements, canvas needs to be redrawn and cleared on every tick
      onUpdate: async () => {
        ctx.clearRect(0, 0, 128, 64);
        // redraw the square at it's new position
        ctx.fillRect(position.x, position.y, 10, 10);
        //utils.publish(ctx, rgbmatrix)
        utils.publishLayers(layers, rgbmatrix)
        //await utils.wait(1000);
      }
    });
    gsap.gsap.to(style, {
      color: 'blue',
      duration: 10,
      repeat: 2,
      ease: "elastic.out(1,0.3)",
      onUpdate: () => {
        //console.log(style.color);
        ctx.fillStyle = style.color;
      }

    });
  },

  /**
   * Advanced Demo showcasing Konva Layers and Konva shapes features
   * Multiple layers dispatched to RGBmAtrix using PublishLayers utils method
   * @param {*} rgbmatrix 
   * @param {*} stage 
   */
  d4: async function (rgbmatrix, stage) {
    var layers = utils.getLayers(stage)
    var rect1 = new Konva.Rect({
      x: 0,
      y: 0,
      width: 30,
      height: 10,
      fill: 'green',
      stroke: 'blue',
      strokeWidth: 1,
    });

    var oval = new Konva.Ellipse({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radiusX: 20,
      radiusY: 10,
      fill: 'yellow',
      stroke: 'red',
      strokeWidth: 0.5,
    });

    layers[0].add(oval);
    layers[0].add(rect1);
    stage.add(layers[0]);
    layers[0].draw();
    utils.publishLayers(layers, rgbmatrix)
  },

  /**
   * Advanced Demo showing Konva Tween APIs
   * on Konva Shapes.
   * @param {*} rgbmatrix 
   * @param {*} stage 
   */
  d5: async function (rgbmatrix, stage) {
    rgbmatrix.clear().sync()
    var layers = utils.getLayers(stage)
    var rect = new Konva.Rect({
      x: 5,
      y: 2,
      width: 30,
      height: 15,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 2,
      opacity: 0.2,
    });

    layers[0].add(rect);
    var tween = new Konva.Tween({
      node: rect,
      duration: 5,
      x: 40,
      y: 30,
      fill: 'red',
      easing: Konva.Easings.BounceEaseOut,
      rotation: 180,
      opacity: 1,
      stroke: 'green',
      strokeWidth: 1,
      scaleX: 1.4,
      onUpdate: () => {
        utils.publishLayers(layers, rgbmatrix)
      }
    });

    tween.play();

  },
  /**
   * Advanced Demo showcasing Matterjs physics library for rendering
   * physics simulations. 
   * Checkout custom rendered that works with node canvas in utils/render.js
   * @param {*} rgbmatrix 
   * @param {*} stage 
   */
  d6: async function (rgbmatrix, stage) {
    var layers = utils.getLayers(stage)

    var Engine = Matter.Engine,
      Render = CRender,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

    var engine = Engine.create();
    Engine.clear(engine);

    // create a renderer
    var render = Render.create({
      canvas: layers[0].getNativeCanvasElement(),
      engine: engine,
      
      options: {
        width: rgbmatrix.width(),
        height: rgbmatrix.height(),
        wireframes: false
    }
    });

    // create two boxes and a ground
    var wbodies = []
    for(var i=0; i<10; i++){
    var boxA = Bodies.rectangle(40, 0, 8, 8, {
      render: {
         fillStyle: 'red',
         strokeStyle: 'blue',
         lineWidth: 0.5
    }
    });
    wbodies.push(boxA)
  }

    var boxB = Bodies.rectangle(45, 30, 10, 10);
    var ground = Bodies.rectangle(64, 60, 128, 10, { isStatic: true })

    wbodies.push(boxB)
    wbodies.push(ground)
    // add all of the bodies to the world
    Composite.clear(engine.world, false)
    Composite.add(engine.world, wbodies);
    console.log("num objects", Composite.allBodies(engine.world).length)

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    Matter.Events.on(render, "afterRender", function(event){
      //console.log("event fired !!")
      utils.publishLayers(layers, rgbmatrix)
    })

    Matter.Events.on(engine, "collisionStart", function(event){
      //console.log("collission event fired !!")
      //utils.publishLayers(layers, rgbmatrix)
      //utils.exportCanvas(layers[0].getNativeCanvasElement())
    })
  }

}

module.exports = demo