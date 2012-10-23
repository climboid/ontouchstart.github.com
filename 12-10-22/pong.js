(function () {
  var root = this;

  function run () {

    var body = d3.select("body")
        .html("");
   
    var svg = body.append("svg")
        .style({
          background: "#000"
        });

    var w = root.innerWidth/2;
    var h = w / 1.618;
    var r = w / 40;
    var x = w / 2;
    var y = h / 2;
    var dx = 5;
    var dy = 5;

    var leftY = h/2;
    var rightY = h/2;

    var ball = svg.append("circle")
        .attr({
          fill: "#FFF",
          r: r,
          cx: x,
          cy: y
        });

    var leftPad = svg.append("rect")
        .attr({
          fill: "#FFF",
          x: 1,
          y: leftY - h/10,
          width: w/40,
         height: h/5
        });

    var rightPad = svg.append("rect")
        .attr({
          fill: "#FFF",
          x: w - w/40 -1,
          y: rightY - h/10,
          width: w/40,
          height: h/5
        });

    var dt = 5;

    svg.style({
        width: w,
        height: h,
        "margin-left": w/2,
        "margin-top": h/2
    });

    function bounce() {
      var tmp;	
      if(x+dx > w - r - w/40) {
        x = w-r-w/40;
        dx = - dx;
      }
      if(x+dx < r + w/40) {
        x = r + w/40;
        dx = - dx;
      }
      if(y+dy > h - r) {
        y = h-r;
        dy = - dy;

        if(dx > 0) {
          rightY = (tmp = h + (w - x) * dy / dx) > 0 && tmp < h ? tmp : rightY;
        }
        else {
          leftY = (tmp = h - x * dy / dx) > 0 && tmp < h? tmp : leftY;
        }
      }
      if(y+dy < r) {
        y = r;
        dy = - dy;

        if(dx > 0) {
          rightY = (tmp = (w - x) * dy / dx) > 0 && tmp < h? tmp : rightY;
        }
        else {
          leftY = (tmp = - x * dy / dx) > 0 && tmp < h? tmp : leftY;
        }
      }

      leftPad.attr({
        x: 1,
        width: w/40,
        height: h/5
        });

      rightPad.attr({
        x: w - w/40 - 1,
        width: w/40,
        height: h/5
        });

      leftPad.transition()
          .ease("linear")
          .duration(x)
          .attr({
            y: leftY - h/10,
            });

      rightPad.transition()
          .ease("linear")
          .duration(w - x)
          .attr({
            y: rightY - h/10
          });

    }

    function update() {
      w = root.innerWidth/2;
      h = w / 1.618;
      r = w / 40;

      x += dx;
      y += dy;
      bounce();

      svg.style({
          width: w,
          height: h,
          "margin-left": w/2,
          "margin-top": h/2
      });

      ball.transition()
          .ease("linear")
          .duration(dt)
          .attr({cx: x, cy:y, r: r})
          .each("end", update);      

    }
    update();
  }

  function load() {
    function route(hash, title) {
      if(document.location.hash === hash) {
        document.title = title;
        if(typeof d3 === "undefined") {
          var js = document.createElement("script");
          js.src = "d3.v2.min.js";
          js.onload = run;
          document.body.appendChild(js);
        }
        else {
          run();
        }
      }
    }

    route("#pong", "Pong");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);
