var coll = document.getElementsByClassName("expandButton");
var i;
let expandlength = "20vh";
let opa = 0.75;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      this.style.bottom = "0px";
      this.style.opacity = 1.0;
      content.style.display = "none";
    } else {
      this.style.bottom = expandlength;
      content.style.height = expandlength;
      this.style.opacity = opa;
      content.style.opacity = opa;
      content.style.display = "block";
    }
  });
}

// Replace with key value pair display

var sdout = document.getElementsByClassName("data-holder")[0]

function bbout(text) {
  let sp1_content = document.createTextNode(text);
  sdout.replaceChild(sp1_content,sdout.firstChild);
}
