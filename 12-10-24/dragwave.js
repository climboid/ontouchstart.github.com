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
          position: "absolute",
          background: "#000"
        });

    var slider = body.append("div")
        .style({
          position: "absolute",
          background: "#ccc",
          padding: 0,
        });

    var control = slider.append("div")
        .style({
          position: "absolute",
          width: 44,
          height: 44,
          background: "blue"     
      });

    function dragmove(d) {
      if(d3.event.y >= h/2 + 22 && d3.event.y < h + h/2 - 22) {
        control.style({
          top: d3.event.y - 22 - h/2
        });
        A = -(d3.event.y -h);
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
        top: h/2 - 22
      });
      A = 0;

      svg.style({
          width: w,
          height: h,
          left: w/2,
          top: h/2
        });

      slider.style({
          height: h,
          width: 44,
          left: w/2 + w,
          top: h/2
        });

      x = d3.scale.linear()
          .domain([0, n-1])
          .range([0, w]);

      y = d3.scale.linear()
          .domain([h, 0])
          .range([-h/2, h/2]);

      line = d3.svg.line()
          .interpolate("basis-open")
          .x(function(d,i) { return x(i); })
          .y(function(d) { return y(d); });
    }

    function update() {
      data.shift();
      data.push(A);
      
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

    route("#dragwave", "Drag Wave");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);
