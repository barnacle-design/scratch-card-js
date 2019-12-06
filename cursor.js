const cursor = document.querySelector("div.cursor");
const canvasIn = document.querySelector("canvas.in");
const canvasOut = document.querySelector("canvas.out");

let isMouseDown = false;

// on mouse hold, make cursor bigger

const growCursor = function () {
    cursor.classList.add("is-down");
    // cursor.innerHTML = `<span>Let go please`;

}

// release of click, make cursor smaller

const shrinkCursor = function () {
    cursor.classList.remove("is-down");
    // cursor.innerHTML = `<span>Click Me</span>`;


}

// move cursor based on coordinates

const moveCursor = function (x, y) {
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
}

// setup canvas

const setupCanvas = function (canvas) {
    const bodyTag = document.querySelector("body");

    const w = window.innerWidth;
    const h = window.innerHeight;
    // to use for full document height
    // const h = bodyTag.offsetHeight;

    console.log(bodyTag.offsetHeight)

    // 1+
    const dpi = window.devicePixelRatio;

    canvas.width = w * dpi;
    canvas.height = h * dpi;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    // 2D
    const context = canvas.getContext("2d");
    // dpi for retina
    context.scale(dpi, dpi);

    if (canvas.classList.contains("in")) {
        context.fillStyle = "#000000";
        context.strokeStyle = "#ffffff";
    } else {
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#000000";
    }

    context.lineWidth = 160;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.shadowBlur = 15;
    context.shadowColor = context.strokeStyle

    context.rect(0, 0, w, h);
    context.fill()

}

// start to draw, based on the canvas, x y
const startDraw = function (canvas, x, y) {
    const context = canvas.getContext("2d");
    // random colors...
    // const colors = ["red", "yellow", "blue", "green"];
    // const randomNum = Math.floor(Math.random() * colors.length);

    // random color
    // context.strokeStyle = colors[randomNum];



    context.moveTo(x, y);
    context.beginPath();
}


// draw based on 3 things, canvas x and y

const moveDraw = function (canvas, x, y) {
    const context = canvas.getContext("2d");

    if (isMouseDown) {
        // context.rect(x - 30, y - 20, 60, 40)
        // context.fill()
        context.lineTo(x, y);
        context.stroke();
    }



}









setupCanvas(canvasIn)

setupCanvas(canvasOut)




document.addEventListener("mousedown", function (e) {
    isMouseDown = true;
    growCursor();
    startDraw(canvasIn, e.pageX, e.pageY)
    startDraw(canvasOut, e.pageX, e.pageY)
})

document.addEventListener("mouseup", function () {
    isMouseDown = false;
    shrinkCursor()
})

document.addEventListener("mousemove", function (e) {
    moveCursor(e.pageX, e.pageY);
    moveDraw(canvasIn, e.pageX, e.pageY)
    moveDraw(canvasOut, e.pageX, e.pageY)
})

window.addEventListener("resize", function () {
    setupCanvas(canvasIn);
    setupCanvas(canvasOut);
})



// touchstart

document.addEventListener("touchstart", function (event) {
  isMouseDown = true
  startDraw(canvasIn, event.pageX, event.pageY)
  startDraw(canvasOut, event.pageX, event.pageY)
})

document.addEventListener("touchend", function () {
  isMouseDown = false
})

document.addEventListener("touchmove", function (event) {
  moveDraw(canvasIn, event.pageX, event.pageY)
  moveDraw(canvasOut, event.pageX, event.pageY)
})







