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

    var t = 0;
    var n = 50;
    var data = d3.range(n).map(function(i) { return 0; });

    function update() {
      t++;
      var w = root.innerWidth/2;
      var h = w / 1.68;

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
      
      data.push(Math.sin(t/Math.PI)/2);

      path.datum(data);
      path.transition()
          .ease("linear")
          .duration(100)
          .attr("d", line);
     setTimeout(update, 100);
    }
    update();    

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

    route("#wave", "Wave");
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);

