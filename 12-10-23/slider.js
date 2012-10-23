(function () {
  var root = this;

  function run () {
    var w = root.innerWidth/2;
    var h = w / 1.618;

    var A, x,y,line;

    var body = d3.select("body")
        .html("")
        .style({
          margin: 0,
          padding: 0
        });
   
    var svg = body.append("svg")
        .style({
          background: "#000"
        });

    var slider = body.append("div")
        .style({
          background: "#ccc",
          padding: 0,
          "margin-top": 5
        });

    var control = slider.append("div")
        .style({
          left: w - 20,
          position: "absolute",
          width: 44,
          height: 44,
          background: "blue"     
      });

    function dragmove(d) {
      if(d3.event.x >= w/2 + 20 && d3.event.x < w + w/2 - 20) {
        control.style({
          left: d3.event.x -20
        });
        A = (d3.event.x - w/2 -20) / w;
      }
    }

    var drag = d3.behavior.drag()
        .on("dragstart", dragmove)
        .on("drag", dragmove);


    slider.call(drag);
       
    var path = svg.append("path")
        .style({
          stroke: "green",
          "stroke-width": 2,
          fill: "none"
        });

    var f0 = 60;
    var dt = 1000/f0;
    var n = 60;
    var data = d3.range(n).map(function(i) { return 0; });

    root.onresize = function () {
      w = root.innerWidth/2;
      h = w / 1.618;
      control.style({
        left: w - 20
      });
      A = 1/2;

      svg.style({
          width: w,
          height: h,
          "margin-left": w/2,
          "margin-top": h/2
        });

      slider.style({
          width: w,
          height: 44,
          "margin-left": w/2
        });

     x = d3.scale.linear()
          .domain([0, n-1])
          .range([0, w]);

     y = d3.scale.linear()
          .domain([-1.2, 1.2])
          .range([h, 0]);

     line = d3.svg.line()
          .interpolate("basis-open")
          .x(function(d,i) { return x(i); })
          .y(function(d) { return y(d); });
    }
    
    function signal() {
      var t = (new Date()) / 1000;
      var period = 1;
      var omega = 2 * Math.PI / period;
      return A * Math.sin(omega * t);
    }

    function update() {

      data.shift();
      data.push(signal());
      
      path.datum(data);
      path.transition()
          .ease("linear")
          .duration(dt)
          .attr("d", line)
          .each("end", update);
    }
    root.onresize();
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

    route("#slider", "Simple Harmonic Motion with slider control");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);
