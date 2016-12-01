window.addEventListener('load', function (event){
  let btn = document.getElementById('btn');
  let test = document.getElementById('test');
  btn.addEventListener('click', function (event){
    console.log(test)
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(event) {
	 console.log("readyState:" + request.readyState);
	 console.log("status:" + request.status);
	 console.log("responseText:" + request.responseText);
	 if( request.status == 4 )
       console.log('- success!');
	 console.log("-----");
      test.innerHTML = request.responseText;
    };
    request.open('GET', 'http://forverkliga.se/JavaScript/api/simple.php?key=value');
    request.send();
  });
});
