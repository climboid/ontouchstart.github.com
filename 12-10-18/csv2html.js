(function () {
  var root = this;

  function run () {

    var body = d3.select("body").html("");

    var csv = '"Year","Make","Model","Description","Price"\n1997,"Ford","E350","ac, abs, moon",3000.00\n1999,Chevy,"Venture ""Extended Edition""","",4900.00\n1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00\n1996,"Jeep","Grand Cherokee","MUST SELL! air, moon roof, loaded",4799.00';

    body.append("textarea")
      .style({
        width: "80%", 
        height: "20%", 
        margin: "20px 10%",
        "font-family": "monospace"
      })
      .text(csv)
      .on("keyup", function () {
        csv2html(d3.event.target.value);
       });

      var tableContainer = body.append("div");
      var table = tableContainer.append("table")     
          .style({
            width: "80%",
            margin: "20px 10%"
          });
      
      var src = body.append("div")     
          .style({
            width: "80%",
            margin: "20px 10%",
            padding: 5,
            border: "1px solid",
            "font-family": "monospace"
          });

      function csv2html (csv) {
        table.html("");

        var tr = table.selectAll("tr")
            .data(d3.csv.parseRows(csv))
          .enter()
            .append("tr")
            .style({background: "#ddd"});

        var td = tr.selectAll("td")
            .data(function(d) { return d; })
          .enter()
            .append("td")
            .style({ padding: "1em"})
            .text(function (d) { return d; });

        src.text(tableContainer.html());
      }
      csv2html(csv);
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

    route("#csv2html", "CSV to HTML");
  }

  root.addEventListener("hashchange", load);
  root.addEventListener("load", load);

}).call(this);


