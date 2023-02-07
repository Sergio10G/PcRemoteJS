function sendTrail(start, end) {
    $.post({
        url: "http://localhost:3000/",
        data: {type: "trail", startx: start.x, starty: start.y, endx: end.x, endy: end.y},
        success: function (data) {
          console.log("Mensaje enviado!");
        },
        dataType: "json"
      });
}

let canvas = document.getElementById("canvas");

console.log("Yo!");

let startPoint, endPoint;

canvas.addEventListener("mousedown", (ev) => {
    console.log("Mouse Down");
    startPoint = {"x" : ev.clientX, "y" : ev.clientY};
}, false);

canvas.addEventListener("touchmove", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    let me = new MouseEvent ("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
});

/*
canvas.addEventListener("mousemove", (ev) => {
    if (registeringTrail)
        trail.push();
});
*/

/*
canvas.addEventListener("mouseup", (ev) => {
    console.log("Mouse Up");

    endPoint = {"x" : ev.clientX, "y" : ev.clientY}
    sendTrail(startPoint, endPoint);
    startPoint = null;
    endPoint = null;
});
*/