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
    var r = 10;
    var x = w/2;
    var y = h/2;
    var dx = 5;
    var dy = 5;
    var ball = svg.append("circle")
        .attr({
          fill: "#FFF",
          r: r,
          cx: x,
          cy: y
        });
    var dt = 5;

    svg.style({
        width: w,
        height: h,
        "margin-left": w/2,
        "margin-top": h/2
    });

    function bounce() {
      if(x+dx > w - r) {
        x = w-r;
        dx = - dx;
      }
      if(x+dx < r) {
        x = r;
        dx = - dx;
      }
      if(y+dy > h - r) {
        y = h-r;
        dy = - dy;
      }
      if(y+dy < r) {
        y = r;
        dy = - dy;
      }
    }

    function update() {
      w = root.innerWidth/2;
      h = w / 1.618;
      
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
          .attr({cx: x, cy:y})
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

    route("#bounce", "Bounce");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);


