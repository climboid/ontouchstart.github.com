function load(mainJS, inputJSON) {
var input = document.createElement('textarea');
input.cols = 80;
input.rows = 6;
input.json = {};

var main = document.createElement('textarea');
main.cols = 80;
main.rows = 12;

document.body.appendChild(input);
document.body.appendChild(main);

var add = document.createElement('button');
add.innerHTML = 'ADD';
document.body.appendChild(add);

var ol = document.createElement('ol');
document.body.appendChild(ol);

var output = document.createElement('div');
document.body.appendChild(output);

for( var i in localStorage) {
  if(localStorage.hasOwnProperty(i)) {
    var li = document.createElement('li')
    var key = document.createElement('button');
    key.innerHTML = i;
    key.value = localStorage.getItem(i);
    key.onclick = function () {
      var obj = JSON.parse(this.value);
      main.value = obj.main;
      var data = JSON.parse(this.value);
      delete(data.main);
      input.value = JSON.stringify(data);
      input.style.display = 'block';
      main.style.display = 'block';
      add.style.display = 'block';
    }
    
    var del = document.createElement('button');
    del.innerHTML = 'DEL';
    del.key = i;
    li.appendChild(del);

    del.onclick = function () {
      localStorage.removeItem(this.key);
      document.location.href = '.';    
    }
    li.appendChild(key);

    var run = document.createElement('button');
    run.value = localStorage.getItem(i);
    run.innerHTML = 'RUN';
    li.appendChild(run);

    run.onclick = function () {
      var obj = JSON.parse(this.value);
      if(obj.hasOwnProperty("main")) {
          try {
            input.style.display = 'none';
            main.style.display = 'none';
            add.style.display = 'none';
            eval('f = ' + obj["main"]);
            f.apply(obj);
          }
          catch (err) {
            console.log(err);
          }
        };
    }    
    ol.appendChild(li);
  }
}

add.onclick = function () {
  try {
    var jsonObj = JSON.parse(input.value);
    jsonObj.main = main.value;
    var jsonString = JSON.stringify(jsonObj);
    var sha1 = CryptoJS.SHA1(jsonString);
    document.title = sha1;
    localStorage.setItem(sha1, jsonString);
    document.location.href = '.';    
  }
  catch(err) {
    input.value += '\n' + err;
  }
};


var xhrInput = new XMLHttpRequest();

xhrInput.onreadystatechange = function () {
  if(xhrInput.readyState === 4) {
    try {
      input.json = JSON.parse(xhrInput.responseText);
      input.value = JSON.stringify(input.json);
      input.rows = input.value.length / 40;
    }
    catch (err) {
      console.log(err);
    }
  }
};

xhrInput.open('get', inputJSON);
xhrInput.send();

var xhrMain = new XMLHttpRequest();

xhrMain.onreadystatechange = function () {
  if(xhrMain.readyState === 4) {
    try {
      main.value = xhrMain.responseText;
      main.rows = xhrMain.responseText.split('\n').length;
    }
    catch (err) {
      console.log(err);
    }
  }
};

xhrMain.open('get', mainJS);
xhrMain.send();
};