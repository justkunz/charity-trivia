
function answered(correct, question_id) {
  var feedback = document.getElementById("feedback");
  if (correct) {
    feedback.innerHTML = "<p style=\"color:#009900 \"><strong>Correct!</strong></p>";
    var fake_ad = document.createElement('img');
    fake_ad.setAttribute('src', 'img/fake_ad.png');
    feedback.appendChild(fake_ad);
    feedback.appendChild(document.createElement('br'));
    feedback.appendChild(document.createElement('br'));
  } else {
    feedback.innerHTML = "<p style=\"color:#D80000  \"><strong>Incorrect!</strong></p>";
  }
  var next_link = document.createElement('a');
  next_link.setAttribute('href', '/');
  next_link.innerHTML = "Next Question ->";
  feedback.appendChild(next_link);
  
  // update the num tries and correct attempts
  
  xmlhttp = new XMLHttpRequest();
  var analytics_string = "http://127.0.0.1:1337/update_analytics/" + question_id + "/" + correct;
  
  xmlhttp.open("GET", analytics_string, true);
  xmlhttp.onreadystatechange=function(){
       if (xmlhttp.readyState==4 && xmlhttp.status==200){
         string=xmlhttp.responseText;
       }
  }
  xmlhttp.send();  
  
}