const browserWindow = document.querySelector("#window");
const border = document.querySelector("#border");

let offsetX = 0, offsetY = 0;

window.onload = () => {
    console.log(browserWindow.clientLeft);

  function beginDrag(event) {
    console.log("yee yuuh");
    window.addEventListener("mousemove", mouseMove);
    const windowBoundingBox = browserWindow.getBoundingClientRect();
    offsetX = windowBoundingBox.left - event.clientX;
    offsetY = windowBoundingBox.top - event.clientY;
  }

  function mouseMove(event) {
    console.log(event);

    browserWindow.style.left = offsetX + event.clientX + "px";
    browserWindow.style.top  = offsetY + event.clientY + "px";
  }

  function endDrag() {
    window.removeEventListener("mousemove", mouseMove);
  }

  border.addEventListener("mousedown", beginDrag);
  window.addEventListener("mouseup", endDrag);
};
