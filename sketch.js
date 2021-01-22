// let noiseScale=255;
// let cellSize = 100;
let fc = 0
var bar = false
var started = false
var p0 = '#eb4034';
var p1 = '#8634eb';
var p2 = '#59785e';
var p3 = '#55801d';
var p0before = '';
var p1before = '';
var p2before = '';
var p3before = '';
var dither = false;
var webcolors = false;
var gui;
var webcol;



function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  background(200, 210, 220);
  frameRate(50);
  gui = createGui('Colors');
  gui.addGlobals("p0","p1","p2","p3", "dither", "webcolors");
  noLoop();

  function unhexcolor(hs) {
    return [unhex(hs[1]+hs[2]), unhex(hs[3]+hs[4]), unhex(hs[5]+hs[6])];
  }

  function WebSafeColors() {
   return ["#000000", "#000033", "#000066", "#000099", "#0000CC", "#0000FF", "#003300", "#003333", "#003366", "#003399", "#0033CC", "#0033FF", "#006600", "#006633", "#006666", "#006699", "#0066CC", "#0066FF", "#009900", "#009933", "#009966", "#009999", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#00FF00", "#00FF33", "#00FF66", "#00FF99", "#00FFCC", "#00FFFF", "#330000", "#330033", "#330066", "#330099", "#3300CC", "#3300FF", "#333300", "#333333", "#333366", "#333399", "#3333CC", "#3333FF", "#336600", "#336633", "#336666", "#336699", "#3366CC", "#3366FF", "#339900", "#339933", "#339966", "#339999", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#33FF00", "#33FF33", "#33FF66", "#33FF99", "#33FFCC", "#33FFFF", "#660000", "#660033", "#660066", "#660099", "#6600CC", "#6600FF", "#663300", "#663333", "#663366", "#663399", "#6633CC", "#6633FF", "#666600", "#666633", "#666666", "#666699", "#6666CC", "#6666FF", "#669900", "#669933", "#669966", "#669999", "#6699CC", "#6699FF", "#66CC00", "#66CC33", "#66CC66", "#66CC99", "#66CCCC", "#66CCFF", "#66FF00", "#66FF33", "#66FF66", "#66FF99", "#66FFCC", "#66FFFF", "#990000", "#990033", "#990066", "#990099", "#9900CC", "#9900FF", "#993300", "#993333", "#993366", "#993399", "#9933CC", "#9933FF", "#996600", "#996633", "#996666", "#996699", "#9966CC", "#9966FF", "#999900", "#999933", "#999966", "#999999", "#9999CC", "#9999FF", "#99CC00", "#99CC33", "#99CC66", "#99CC99", "#99CCCC", "#99CCFF", "#99FF00", "#99FF33", "#99FF66", "#99FF99", "#99FFCC", "#99FFFF", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC6666", "#CC6699", "#CC66CC", "#CC66FF", "#CC9900", "#CC9933", "#CC9966", "#CC9999", "#CC99CC", "#CC99FF", "#CCCC00", "#CCCC33", "#CCCC66", "#CCCC99", "#CCCCCC", "#CCCCFF", "#CCFF00", "#CCFF33", "#CCFF66", "#CCFF99", "#CCFFCC", "#CCFFFF", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF6666", "#FF6699", "#FF66CC", "#FF66FF", "#FF9900", "#FF9933", "#FF9966", "#FF9999", "#FF99CC", "#FF99FF", "#FFCC00", "#FFCC33", "#FFCC66", "#FFCC99", "#FFCCCC", "#FFCCFF", "#FFFF00", "#FFFF33", "#FFFF66", "#FFFF99", "#FFFFCC", "#FFFFFF"];
  }

  webcol = WebSafeColors().map(unhexcolor);
}

function draw() {
  if (bar) {
    let startcount = 1;
    let endcount = 200;
    if (!(started) && fc >= startcount) {
    console.log("recording"); capturer.start(); started = true};
    if ((started) && fc >= startcount && fc < endcount) {
    console.log("recording"); capturer.capture(canvas)};
    if (fc >= endcount) {
    console.log("recording"); capturer.stop(); capturer.save(); bar = false};
  }
  let ww = windowWidth;
  let wh = windowHeight;
  let up0 = [unhex(p0[1]+p0[2]), unhex(p0[3]+p0[4]), unhex(p0[5]+p0[6])]
  let up1 = [unhex(p1[1]+p1[2]), unhex(p1[3]+p1[4]), unhex(p1[5]+p1[6])]
  let up2 = [unhex(p2[1]+p2[2]), unhex(p2[3]+p2[4]), unhex(p2[5]+p2[6])]
  let up3 = [unhex(p3[1]+p3[2]), unhex(p3[3]+p3[4]), unhex(p3[5]+p3[6])]

  if (dither && ((p0before != p0)||(p1before != p1)||(p2before != p2)||(p3before != p3))) {
    dither = false;
    document.getElementById("qs_5").checked = false;
  }

  function closewebcol(c) {
    let low = eudist2(c, webcol[0]);
    let buff = webcol[0];
    for (let i = 1; i < webcol.length; i++) {
      let v = eudist2(c, webcol[i]);
      if (v < low) {
        low = v;
        buff = webcol[i];
      }
    }
    return buff;
  }

  if (!dither) {
    for (let i = 0; i < ww; i += 1) {
      let t = i / ww;
      let c = Bez(t, up0, up1, up2, up3);
      if (webcolors) {
        c = closewebcol(c)
      }
      stroke(c);
      line(i, 0, i, wh);
    }
  }

  if (dither) {
    loadPixels();
    let d = pixelDensity();

    function setp(x, y, c_set) {
      index = 4 * ((y * d) * ww * d + (x * d));
      pixels[index] = c_set[0];
      pixels[index+1] = c_set[1];
      pixels[index+2] = c_set[2];
      pixels[index+3] = 255;
    }

    let buff = [...Array(wh)].map(x=>Array(ww));
    for (let y = 0; y < wh; y++) {
      for (let x = 0; x < ww; x++) {
        let t = x / ww;
        buff[y][x] = Bez(t, up0, up1, up2, up3)
      }
    }

    for (let y = 0; y < wh; y++) {
      for (let x = 0; x < ww; x++) {
        let op = buff[y][x];
        let np;
        if (webcolors) {
          np = closewebcol(op);
        } else {
          np = [round(op[0]),round(op[1]),round(op[2])];
        }
        setp(x, y, np);
        let qerr = [op[0]-np[0],op[1]-np[1],op[2]-np[2]];
        if (x+1 < ww) {
          buff[y][x+1] = madd(buff[y][x+1], mscale(qerr, 7/16));
        }
        if (y+1 < wh) {
          if (x-1 >= 0) {
            buff[y+1][x-1] = madd(buff[y+1][x-1], mscale(qerr, 3/16));
          }
          buff[y+1][x] = madd(buff[y+1][x], mscale(qerr, 5/16));
          if (x+1 < ww) {
            buff[y+1][x+1] = madd(buff[y+1][x+1], mscale(qerr, 1/16));
          }
        }
      } 
    }
    updatePixels();
    // fc += 1;
  }
  p0before = p0;
  p1before = p1;
  p2before = p2;
  p3before = p3;
}

function eudist2(a, b) {
  let n1 = a[0]-b[0];
  let n2 = a[1]-b[1];
  let n3 = a[2]-b[2];
  return (n1*n1+n2*n2+n3*n3)
}

function madd(a, b) {
  return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
}

function mscale(m, s) {
  return [s*m[0],s*m[1],s*m[2]]
}

function Bez(t, p0, p1, p2, p3) {
  c = (1-t)
  return [c*c*c*p0[0]+3*c*c*t*p1[0]+3*c*t*t*p2[0]+t*t*t*p3[0], c*c*c*p0[1]+3*c*c*t*p1[1]+3*c*t*t*p2[1]+t*t*t*p3[1], c*c*c*p0[2]+3*c*c*t*p1[2]+3*c*t*t*p2[2]+t*t*t*p3[2]]
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
}

