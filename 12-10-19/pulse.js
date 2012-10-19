(function () {
  var root = this;

  function run () {
    var w = root.innerWidth/2;
    var h = w / 1.68;
    var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, w]);

    var y = d3.scale.linear()
        .domain([0, 1])
        .range([h, 0]);

    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var body = d3.select("body")
        .html("")
        .style({
          margin: 0,
          padding: 0
        });
   
    var svg = body.append("svg")
        .style({
          width: w,
          height: h,
          "margin-left": w/2,
          "margin-top": h/2,
          background: "#000"
        });

    var path = svg.append("path")
       .style({
          stroke: "green",
          fill: "none"
       });

    var phase = Math.PI/2;
    function update() {
      phase = - phase;
      var w = root.innerWidth/2;
      var h = w / 1.68;
      svg.style({
          width: w,
          height: h,
          "margin-left": w/2,
          "margin-top": h/2,
          background: "#000"
        });

      var x = d3.scale.linear()
          .domain([0, 1])
          .range([0, w]);

      var y = d3.scale.linear()
          .domain([0, 1])
          .range([h, 0]);

      var line = d3.svg.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

      var data = d3.range(100).map(function(i) {
        return {x: i / 99, y: (Math.sin(i / 3 + phase) + 2) / 4};
      });
      
      path.datum(data);
      path.transition()
          .ease("linear")
          .duration(1000)
          .attr("d", line);
    }
    
    setInterval(update, 1000);
  }

  function load() {
    function route(hash, title) {
      if(document.location.hash === hash) {
        document.title = title;
        if(typeof d3 === "undefined") {
          var js = document.createElement("script");
          js.src = "d3.v2.js";
          js.onload = run;
          document.body.appendChild(js);
        }
        else {
          run();
        }
      }
    }

    route("#pulse", "Pulse");
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);


