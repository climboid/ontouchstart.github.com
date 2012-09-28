function setCSS(el, attr) {
  for(var k in attr) {
    if(attr.hasOwnProperty(k)) {
      el.style[k] = attr[k];
    }
  }
  return el;
}

function setAttr(el, attr) {
  for(var k in attr) {
    if(attr.hasOwnProperty(k)) {
      el.setAttribute(k, attr[k]);
    }
  }
  return el;
}

function el(tag, option) {
  var el = document.createElement(tag);
  if(option.attr) setAttr(el, option.attr);
  if(option.css) setCSS(el, option.css);
  return el;
}

function ticTacToe() {
  var w = document.body.scrollWidth / 2;
  var h = w;

  var css = { position: 'relative',
    width: w + 'px',
    height: h + 'px',
    marginLeft: ((document.body.scrollWidth - w) / 2) + 'px',
    marginTop: '20px'       
  };

  var c = el('div', { css : css });
  document.body.appendChild(c);
  window.addEventListener('orientationchange', function () {
    c.style.marginLeft = (document.body.scrollWidth - w) / 2 + 'px';
  });

  var attr = { width: w,
    height: h
  };

  var canvas = el('canvas', {attr: attr});

  c.appendChild(canvas);

  ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;

  function grid(ctx) {
    ctx.beginPath();
    ctx.moveTo(w/3 ,0);
    ctx.lineTo(w/3, h);

    ctx.moveTo(2*w/3, 0);
    ctx.lineTo(2*w/3, h);

    ctx.moveTo(0, h/3);
    ctx.lineTo(w, h/3);

    ctx.moveTo(0, 2*h/3);
    ctx.lineTo(w, 2*h/3);
    ctx.stroke();
    ctx.save();
  }

  grid(ctx);

  var tileArray = [];
  OScore = [0,0,0,0,0,0,0,0];
  XScore = [0,0,0,0,0,0,0,0];
  scoreIndex = [
    [0, 3, 6],
    [0, 4],
    [0, 5, 7],
    [1, 3],
    [1, 4, 6, 7],
    [1, 5],
    [2, 3, 7],
    [2, 4],
    [2, 5, 6]
      ];

  function mark (n) {
    for (var i = 0; i < 9; i++) {
      tileArray[i].style.display = 'none';
    }
    ctx.beginPath();
    ctx.lineWidth = 80;
    ctx.strokeStyle = 'rgba(255,255,0,0.7)';
    switch (n) {
      case 0:
        ctx.moveTo(0, h/6);
        ctx.lineTo(w, h/6);
        break;
      case 1:
        ctx.moveTo(0, h/6 - (- h/3));
        ctx.lineTo(w, h/6 - (- h/3));
        break;
      case 2:
        ctx.moveTo(0, h/6 - (- 2*h/3));
        ctx.lineTo(w, h/6 - (- 2*h/3));
        break;
      case 3:
        ctx.moveTo(w/6, 0);
        ctx.lineTo(w/6, h);
        break;
      case 4:
        ctx.moveTo(w/6 -(-w/3) , 0);
        ctx.lineTo(w/6 -(-w/3), h);
        break;
      case 5:
        ctx.moveTo(w/6 -(-2*w/3), 0);
        ctx.lineTo(w/6 -(-2*w/3), h);
        break;
      case 6:
        ctx.moveTo(0, 0);
        ctx.lineTo(w, h);
        break;
      case 7:
        ctx.moveTo(0, h);
        ctx.lineTo(w, 0);
    }
    ctx.stroke();

    setTimeout(ticTacToe, 100);
  }

  function setTiles() {
    OPlaying = false;
    id = 0;
    for(var j = 0; j < 3; j++) {
      for(var i = 0; i < 3; i++) {

        var attr = {id: id++,
          x: w * i / 3 - (- w / 6),
          y: h * j / 3 - (- h / 6)
        };

        var css = {position: 'absolute',
          width: (w/3-1) + 'px',
          height: (h/3-1) + 'px',
          left: 0,
          top: 0,
          webkitTransform: 'translate3d(' + (w * i / 3) + 'px,' + (h * j / 3) + 'px,0)'
        };

        var tile = el('div', {attr: attr, css: css});
        tileArray.push(tile);
        c.appendChild(tile);
      }
    }
  }

  setTiles();

  var moveCount = 0;
  for (var i = 0; i < 9; i++) {
    tileArray[i].ontouchstart = function() {
      this.style.display = 'none';       
      var x = this.getAttribute('x');
      var y = this.getAttribute('y');
      var id = this.getAttribute('id');
      var scoreIndexArray = scoreIndex[id];
      ctx.save();
      ctx.lineWidth = 25;
      ctx.lineCap = 'round';
      ctx.beginPath();
      if(OPlaying) {        
        for(var n in scoreIndexArray) {
          OScore[scoreIndexArray[n]]++;
        }              
        ctx.arc( x, y, w/9, 0, Math.PI*2, true);
        OPlaying = false;
      }
      else {
        for(var n in scoreIndexArray) {
          XScore[scoreIndexArray[n]]++;
        }                      
        ctx.moveTo(x - w/9, y - w/9);
        ctx.lineTo(x - (- w/9), y - (- w/9));
        ctx.moveTo(x - w/9, y - (-w/9));
        ctx.lineTo(x -(- w/9), y - w/9);
        OPlaying = true;
      }
      ctx.stroke();
      ctx.restore();
      ctx.save();

      for(var n = 0; n < 8; n++) {
        if(OScore[n] > 2 || XScore[n] > 2) {           
          mark(n);
          return;
        }
      }

      moveCount++;
      if(moveCount > 8) {
        setTimeout(ticTacToe, 100);
      }
    };
  }
}

function runTicTacToe() {
  if(document.location.hash === '#ticTacToe') {
    document.body.innerHTML = '';
    ticTacToe();
  }
}

window.addEventListener("hashchange", runTicTacToe);
window.addEventListener("load", runTicTacToe);
