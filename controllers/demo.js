var utils = require('../utils/utils')
const gsap = require('gsap')
//require('node-easel');
//var Matter = require('matter-js')

demo = {
  d0: function (rgbmatrix) {
    rgbmatrix.clear().sync()
  },
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
  d2: async function (rgbmatrix, canvas) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "#ff0000";
    ctx.font = "20px Arial";
    ctx.rotate(20 * Math.PI / 180);
    ctx.fillText("Hello World", 0, 0);

    utils.publish(ctx, rgbmatrix)
    await utils.wait(99999999);
  },
  d3: async function (rgbmatrix, canvas) {
    const ctx = canvas.getContext('2d')
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
        utils.publish(ctx, rgbmatrix)
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
  d4: async function (rgbmatrix, canvas) {
    const ctx = canvas.getContext('2d')
    var stage = new createjs.Stage(canvas);
    var shape = new createjs.Shape();
    shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
    stage.addChild(shape);
    stage.update();
    utils.publish(ctx, rgbmatrix)
  },
  d5: async function (rgbmatrix, canvas) {
    /*const ctx = canvas.getContext('2d')
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: 128,
        height: 64
    }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);*/
  }

}

module.exports = demo