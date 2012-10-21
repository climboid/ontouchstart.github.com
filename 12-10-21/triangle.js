(function () {
  var root = this;

  function run () {
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
    
    function signal() {
      var t = (new Date()) / 1000;
      var period = 1;
      var omega = 2 * Math.PI / period;
      var y = 0;
      var sign = 1;
      var n = 10;
      for(var k = 1; k <= n; k++) {
        y += sign * Math.sin((2 * k - 1) * omega * t)/((2 * k - 1) * (2 * k - 1));
        sign = -sign;
      }
      return 4 * y / (Math.PI * Math.PI);
    }

    function update() {
      var w = root.innerWidth/2;
      var h = w / 1.618;

      svg.style({
          width: w,
          height: h,
          "margin-left": w/2,
          "margin-top": h/2
        });

      var x = d3.scale.linear()
          .domain([0, n-1])
          .range([0, w]);

      var y = d3.scale.linear()
          .domain([-1, 1])
          .range([h, 0]);

      var line = d3.svg.line()
          .interpolate("basis-open")
          .x(function(d,i) { return x(i); })
          .y(function(d) { return y(d); });

      data.shift();
      data.push(signal());
      
      path.datum(data);
      path.transition()
          .ease("linear")
          .duration(dt)
          .attr("d", line)
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

    route("#triangle", "Triangle Wave");
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);


