function answered(correct) {
  var feedback = document.getElementById("feedback");
  if (correct) {
    feedback.innerHTML = "<p style=\"color:#009900 \"><strong>Correct!</strong></p>";
  } else {
    feedback.innerHTML = "<p style=\"color:#D80000  \"><strong>Incorrect!</strong></p>";
  }
  var next_link = document.createElement('a');
  next_link.setAttribute('href', '/');
  next_link.innerHTML = "Next Question ->";
  feedback.appendChild(next_link);
}