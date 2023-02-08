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
let startPoint = null;
let endPoint = null;
let trail = [];

canvas.addEventListener("touchstart", (ev) => {
	let evt = (typeof ev.originalEvent === 'undefined') ? ev : ev.originalEvent;
	let touch = evt.touches[0] || evt.changedTouches[0];
	let tStartEvt = new MouseEvent("mousedown", {
		clientX: touch.pageX,
		clientY: touch.pageY
	});
	canvas.dispatchEvent(tStartEvt);
});

canvas.addEventListener("mousedown", (ev) => {
    console.log("Mouse Down");
	trail = [];
	startPoint = {
		x: ev.clientX,
		y: ev.clientY
	};
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
	if (endPoint != null)
		startPoint = endPoint;
	endPoint = {
		x: ev.clientX,
		y: ev.clientY
	};
	//console.log(startPoint);
	trail.push(startPoint);
	trail.push(endPoint);
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
	startPoint = null;
	endPoint = null;
	canvas.style.backgroundColor = "gray";
});
