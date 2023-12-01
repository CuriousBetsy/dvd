let body = document.querySelector("body");
let logo = document.querySelector("img");

body.style.backgroundColor = `rgb(${Math.floor(
  Math.random() * 255
)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
setInterval(() => {
  body.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
}, 5 * 1000);
////////////////////////////////////////////////////////////////
// MOVING THE LOGO
let direction = "dr"; // tr, tl, dl

function rn() {
  return Math.trunc(Math.random() * 3);
}

function dr() {
  logo.style.top = logo.getBoundingClientRect().y + 1 + "px";
  logo.style.left = logo.getBoundingClientRect().x + 1 + "px";
  checkBorderCollision();
}
function tr() {
  logo.style.top = logo.getBoundingClientRect().y - 1 + "px";
  logo.style.left = logo.getBoundingClientRect().x + 1 + "px";
  checkBorderCollision();
}
function tl() {
  logo.style.top = logo.getBoundingClientRect().y - 1 + "px";
  logo.style.left = logo.getBoundingClientRect().x - 1 + "px";
  checkBorderCollision();
}
function dl() {
  logo.style.top = logo.getBoundingClientRect().y + 1 + "px";
  logo.style.left = logo.getBoundingClientRect().x - 1 + "px";
  checkBorderCollision();
}

function checkBorderCollision() {
  let rn = Math.ceil(Math.random() * 2);
  if (logo.getBoundingClientRect().bottom > window.innerHeight) {
    rn == 1 ? (direction = "tr") : (direction = "tl");
  }

  if (logo.getBoundingClientRect().left > window.innerWidth * 0.8) {
    rn == 1 ? (direction = "tl") : (direction = "dl");
  }

  if (logo.getBoundingClientRect().top < 0) {
    rn == 1 ? (direction = "dr") : (direction = "dl");
  }

  if (logo.getBoundingClientRect().left < 0) {
    rn == 1 ? (direction = "tr") : (direction = "dr");
  }
}

function logoMove() {
  if (direction == "dr") dr();
  if (direction == "tr") tr();
  if (direction == "tl") tl();
  if (direction == "dl") dl();
}

console.log(logo.getBoundingClientRect());
let i = setInterval(logoMove, 5);

document.addEventListener("keydown", function (e) {
  let key = e.key.match(/(?<=[a-z])[A-Z]\w+/g)[0];
  switch (key) {
    case "Up":
      logo.style.top = logo.getBoundingClientRect().y - 50 + "px";
      break;
    case "Down":
      logo.style.top = logo.getBoundingClientRect().y + 50 + "px";
      break;
    case "Left":
      logo.style.left = logo.getBoundingClientRect().x - 50 + "px";
      break;

    case "Right":
      logo.style.left = logo.getBoundingClientRect().x + 50 + "px";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "q") {
    if (document.body.lastElementChild.classList.contains("info-tab")) {
      document.body.lastElementChild.remove();
      i = setInterval(logoMove, 5);
    } else {
      clearInterval(i);
      console.log("show menu nigga");
      document.body.insertAdjacentHTML(
        "beforeend",
        `
      <div class='info-tab'>
      <p>OffsetLeft/Top {X, Y}: {${Number(logo.offsetLeft)}, ${Number(
          logo.offsetTop
        )}}</p>
      <p>OffsetWidth: ${logo.offsetWidth}, OffsetHeight: ${
          logo.offsetHeight
        }</p>
      <p>ClientWidth: ${logo.clientWidth}, ClientHeight: ${
          logo.clientHeight
        }</p>

        <p>ClientTop: ${logo.clientTop}, ClientLeft: ${logo.clientLeft}</p>
        <p>ScrollTop: ${logo.scrollTop}, ScrollHeight: ${logo.scrollHeight}</p>
  
  
        <p>BODY SCROLL HEIGHT: ${document.body.scrollHeight}</p>


        <p>${logo.offsetWidth} : ${logo.getBoundingClientRect().width}</p>
      </div>


    `
      );
    }
  }
});
