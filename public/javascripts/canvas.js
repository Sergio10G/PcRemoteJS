function sendTrail() {
	let trailSize = trail.length;
	if (trailSize == 0)
		return;
    $.post({
        url: "http://192.168.1.143:3000/com",
        data: {
			type: "trail",
			data: JSON.stringify(trail)
		},
		success: null,
		dataType: "json"
		});
	trail.splice(0, trailSize);
}

const reqPeriod = 50;

const canvas = document.getElementById("canvas");

console.log("Yo!");

let registeringTrail = false;
let dataSendTimer = null;
let trailPoint = null;
let trail = [];

canvas.addEventListener("touchstart", (ev) => {
	let tStartEvt = new MouseEvent("mousedown", null);
	canvas.dispatchEvent(tStartEvt);
});

canvas.addEventListener("mousedown", (ev) => {
    console.log("Mouse Down");
	trail = [];
	registeringTrail = true;
	dataSendTimer = setInterval(sendTrail, reqPeriod);
}, false);

canvas.addEventListener("touchmove", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
	
	let evt = (typeof ev.originalEvent === 'undefined') ? ev : ev.originalEvent;
	let touch = evt.touches[0] || evt.changedTouches[0];

	let moveEvt = new MouseEvent("mousemove", {
		clientX: touch.pageX,
		clientY: touch.pageY
	});
	canvas.dispatchEvent(moveEvt);
	canvas.style.backgroundColor = "blue";
});

canvas.addEventListener("mousemove", (ev) => {
	if (!registeringTrail)
		return;
	trailPoint = {
		x: ev.clientX,
		y: ev.clientY
	};
	trail.push(trailPoint);
});

canvas.addEventListener("touchend", (ev) => {
	let tEndEvt = new MouseEvent("mouseup", null);
	canvas.dispatchEvent(tEndEvt);
});

canvas.addEventListener("mouseup", (ev) => {
    console.log("Mouse Up");

	if (dataSendTimer != null) {
		clearInterval(dataSendTimer);
		dataSendTimer = null;
	}

	registeringTrail = false;
	trailPoint = null;
	canvas.style.backgroundColor = "gray";
});
