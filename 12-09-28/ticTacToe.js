(function () {
  var root = this;
  var w = document.body.scrollWidth / 2;
  var h = w;

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
    if(option.attr) {
      setAttr(el, option.attr);
    }
    if(option.css) {
      setCSS(el, option.css);
    }
    return el;
  }

  function ticTacToe() {

    function setContainer () {
      var css = { position: 'relative',
        width: w + 'px',
        height: h + 'px',
        marginLeft: ((document.body.scrollWidth - w) / 2) + 'px',
        marginTop: '20px'
      };

      var c = el('div', { css : css });
      document.body.appendChild(c);

      root.addEventListener('orientationchange', function () {
        c.style.marginLeft = (document.body.scrollWidth - w) / 2 + 'px';
      });
      return c;
    }

    function setContext(c) {
      var attr = { width: w,
        height: h
      };

      var canvas = el('canvas', {attr: attr});
      c.appendChild(canvas);
      return canvas.getContext('2d');
    }

    var c = setContainer();
    var ctx = setContext(c);

    ctx.lineWidth = 1;

    function line(x1, y1, x2, y2) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }

    function grid() {
      ctx.beginPath();
      line(w/3 ,0, w/3, h);
      line(2*w/3, 0, 2*w/3, h);
      line(0, h/3, w, h/3);
      line(0, 2*h/3, w, 2*h/3);
      ctx.stroke();
      ctx.save();
    }

    grid();

    var moveCount = 0;
    var tileArray = [];
    var OScore = [0,0,0,0,0,0,0,0];
    var XScore = [0,0,0,0,0,0,0,0];
    var scoreIndex = [
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
      ctx.lineWidth = w/4;
      ctx.strokeStyle = 'rgba(255,255,0,0.7)';
      switch (n) {
        case 0:
          line(0, h/6, w, h/6);
          break;
        case 1:
          line(0, h/6 - (- h/3), w, h/6 - (- h/3));
          break;
        case 2:
          line(0, h/6 - (- 2*h/3), w, h/6 - (- 2*h/3));
          break;
        case 3:
          line(w/6, 0, w/6, h);
          break;
        case 4:
          line(w/6 -(-w/3) , 0, w/6 -(-w/3), h);
          break;
        case 5:
          line(w/6 -(-2*w/3), 0, w/6 -(-2*w/3), h);
          break;
        case 6:
          line(0, 0, w, h);
          break;
        case 7:
          line(0, h, w, 0);
      }
      ctx.stroke();

      setTimeout(ticTacToe, 100);
    }

    function setTiles() {
      OPlaying = false;
      var id = 0;
      for(var j = 0; j < 3; j++) {
        for(var i = 0; i < 3; i++) {
          var attr = {id: id++,
            x: w * i / 3 - (- w / 6),
            y: h * j / 3 - (- h / 6)
          };

          var css = {position: 'absolute',
            width: (w/3-1) + 'px',
            height: (h/3-1) + 'px',
            left: (w * i / 3) + 'px',
            top: (h * j / 3) + 'px',
          };

          var tile = el('div', {attr: attr, css: css});
          tileArray.push(tile);
          c.appendChild(tile);
        }
      }
    }

    function pick () {
      var root = this;
      root.style.display = 'none';       
      var x = root.getAttribute('x');
      var y = root.getAttribute('y');
      var id = root.getAttribute('id');
      var scoreIndexArray = scoreIndex[id];
     
      ctx.save();
      ctx.lineWidth = w/40;
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
        line(x - w/9, y - w/9, x - (- w/9), y - (- w/9));
        line(x - w/9, y - (-w/9), x -(- w/9), y - w/9);
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
    }

    setTiles();
   
    if(document.createTouch) {
      for (var i = 0; i < 9; i++) {
        tileArray[i].ontouchstart = pick;
      }
    }
    else {
      for (var i = 0; i < 9; i++) {
        tileArray[i].onmousedown = pick;
      }
    }
  }

  function run() {
    if(document.location.hash === '#ticTacToe') {
      document.body.innerHTML = '';
      document.title = "Tic-Tac-Toe";
      ticTacToe();
    }
  }


  root.addEventListener("hashchange", run);
  root.addEventListener("load", run);
}).call(this);
