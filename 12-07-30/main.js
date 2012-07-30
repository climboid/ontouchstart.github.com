function () {
  var controlStyle = this.controlStyle;
  var railStyle = this.railStyle;
  var leftButtonStyle = this.leftButtonStyle;
  var rightButtonStyle = this.rightButtonStyle;

  function SlideControl (parent, x1, x2, cb) {
    var that = this;
    that.cb = cb;
    that.parent = parent;
    that.x1 = x1;
    that.x2 = x2;
    var div = document.createElement('div');
    for(var k in controlStyle) {
      div.style[k] = controlStyle[k];
    }

    that.parent.appendChild(div);
    that.div = div;
    that.update();
  }

  SlideControl.prototype.touchDraggable = function () {
    var that = this;
    var hotspot = document.createElement('div');
    hotspot.style.width = '100%';
    hotspot.style.height = '100%';
    that.div.appendChild(hotspot);

    var leftButton = document.createElement('div');
    for(var k in leftButtonStyle) {
      leftButton.style[k] = leftButtonStyle[k];
    }
    that.div.appendChild(leftButton);

    var rightButton = document.createElement('div');
    for(var k in rightButtonStyle) {
      rightButton.style[k] = rightButtonStyle[k];
    }
    that.div.appendChild(rightButton);

    hotspot.ontouchstart = function (e) {
      e.preventDefault();
      var x0 = e.touches[0].pageX;
      var x1 = that.x1;
      var x2 = that.x2;
      hotspot.ontouchmove = function(e){
        e.preventDefault();
        var dx = e.touches[0].pageX - x0;
        that.x1 = x1 + dx;
        that.x2 = x2 + dx;

        if(that.x1 < 0) {
          that.x1 = 0;
          that.x2 = x2 - x1;
          that.update();
          return;
        }
        if(that.x2 > that.parent.clientWidth) {
          that.x2 = that.parent.clientWidth;
          that.x1 = that.x2 - x2 + x1;
          that.update();
          return;
        }
        that.update();
      }
      hotspot.ontouchend = function(e){
        hotspot.ontouchmove = null;
      }
    };

    leftButton.ontouchstart = function (e) {
      e.preventDefault();
      var x0 = e.touches[0].pageX;
      var x1 = that.x1;

      leftButton.ontouchmove = function(e){
        e.preventDefault();
        var dx = e.touches[0].pageX - x0;
        that.x1 = x1 + dx;

        if(that.x1 < 0) {
          that.x1 = 0;
          that.update();
          return;
        }

        that.update();
      }
      leftButton.ontouchend = function(e){
        leftButton.ontouchmove = null;
      }
    };

    rightButton.ontouchstart = function (e) {
      e.preventDefault();
      var x0 = e.touches[0].pageX;
      var x2 = that.x2;

      rightButton.ontouchmove = function(e){
        e.preventDefault();
        var dx = e.touches[0].pageX - x0;
        that.x2 = x2 + dx;

        if(that.x2 > that.parent.clientWidth) {
          that.x2 = that.parent.clientWidth;
          that.update();
          return;
        }
        that.update();
      }
      rightButton.ontouchend = function(e){
        rightButton.ontouchmove = null;
      }
    };
  };

  SlideControl.prototype.mouseDraggable = function () {
    var that = this;
    var hotspot = document.createElement('div');
    hotspot.style.width = '100%';
    hotspot.style.height = '100%';
    that.div.appendChild(hotspot);

    var leftButton = document.createElement('div');
    for(var k in leftButtonStyle) {
      leftButton.style[k] = leftButtonStyle[k];
    }
    that.div.appendChild(leftButton);

    var rightButton = document.createElement('div');
    for(var k in rightButtonStyle) { 
      rightButton.style[k] = rightButtonStyle[k];
    }
    that.div.appendChild(rightButton);


    hotspot.onmousedown = function (e) {
      e.preventDefault();
      var x0 = e.pageX;
      var x1 = that.x1;
      var x2 = that.x2;
      hotspot.onmousemove = function(e){
        e.preventDefault();
        var dx = e.pageX - x0;
        that.x1 = x1 + dx;
        that.x2 = x2 + dx;

        if(that.x1 < 0) {
          that.x1 = 0;
          that.x2 = x2 - x1;
          that.update();
          return;
        }

        if(that.x2 > that.parent.clientWidth) {
          that.x2 = that.parent.clientWidth;
          that.x1 = that.x2 - x2 + x1;
          that.update();
          return;
        }
        that.update();
      }
      hotspot.onmouseup = function(e){
        hotspot.onmousemove = null;
      }
      hotspot.onmouseout = function(e){
        hotspot.onmousemove = null;
      }
    };

    leftButton.onmousedown = function (e) {
      e.preventDefault();
      var x0 = e.pageX;
      var x1 = that.x1;

      leftButton.onmousemove = function(e){
        e.preventDefault();
        var dx = e.pageX - x0;
        that.x1 = x1 + dx;

        if(that.x1 < 0) {
          that.x1 = 0;
          that.update();
          return;
        }

        that.update();
      }
      leftButton.onmouseup = function(e){
        leftButton.onmousemove = null;
      }
      leftButton.onmouseout = function(e){
        leftButton.onmousemove = null;
      }
    };

    rightButton.onmousedown = function (e) {
      e.preventDefault();
      var x0 = e.pageX;
      var x2 = that.x2;

      rightButton.onmousemove = function(e){
        e.preventDefault();
        var dx = e.pageX - x0;

        that.x2 = x2 + dx;

        if(that.x2 > that.parent.clientWidth) {
          that.x2 = that.parent.clientWidth;

          that.update();
          return;
        }
        that.update();
      }
      rightButton.onmouseup = function(e){
        rightButton.onmousemove = null;
      }
      rightButton.onmouseout = function(e){
        rightButton.onmousemove = null;
      }
    };
  };

  SlideControl.prototype.update = function () {
    this.div.style.left = this.x1 + 'px';
    this.div.style.width = (this.x2 - this.x1) + 'px';
    this.cb(this.x1, this.x2);
  };

  var rail = document.createElement('div');
  for( var k in railStyle) {
    rail.style[k] = railStyle[k];
  }

  output.innerHTML = '';
  output.appendChild(rail);

  var sc = new SlideControl(rail, 100, 200, function (x1, x2) {
      document.title = '[' + x1 + ',' + x2 + ']';
    });

  if('ontouchstart' in document.body) {
    sc.touchDraggable();
  }
  else {
    sc.mouseDraggable();
  }
}