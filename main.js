// <-------- STEP ONE -------->
// *** create basic skeleton ***
// 1. declare window.onload event
// 2. declare variables (canvas, ctx)
// 3. call and create init() & tick() function
// 3a. tick() function will call itself using window.requestAnimationFrame
// 3b. call and create update() & render() function

// <-------- STEP TWO -------->
// *** create first canvas square ***
// 4. create global variables (var canvas, ctx;)
// 5. style canvas (styles.css)
// 6. create simple Tile class
// 6a. create methods in Tile using 'this' keyword (this.update, this.draw)
// 6b. declare 'data' variable
// 6c. create new Tile with data var (function init)
// 6d. draw data with context (function render)

// <-------- STEP THREE -------->
// *** create NOUGHT & CROSS ***
// 7. create inner canvas (var _c)
// 8. NOUGHT: _ctx.arc(50, 50, 30, 0, 2*Math.PI) 
//		//(start center pt x, start center pt y, radius, start distance, end distance)
// 9. CROSS: create with moveTo and lineTo

// <-------- STEP FOUR -------->
// *** create flip animation ***
// 10. this.flip in Tile class
// 11. clear canvas, shrink in x-direction
// 12. expand canvas to create 9 inner canvases (boxes)

// <-------- STEP FIVE -------->
// *** create mousedown event for flipping tiles ***

var canvas, ctx;
var data;
var player;


window.onload = function main() {
	canvas = document.createElement("canvas");
	canvas.width = canvas.height = 3*120 + 20;
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);

	canvas.addEventListener("mousedown", mouseDown);

	init();
	tick();
}



function init() {
	if (data == null) {
		data = [];

		for (var i=0; i<9; i++) {
			var x = (i % 3)*120 + 20;
			var y = Math.floor(i/3)*120 + 20;
			data.push(new Tile(x, y));
		}
	}

	player = Tile.NOUGHT;
	// data[0].flip(Tile.NOUGHT);
}

function tick() {
	window.requestAnimationFrame(tick);

	update();
	render();
}

function update() {
	for (var i=data.length; i--;) {
		data[i].update();
	}

}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// data.draw(ctx);

	for (var i=data.length; i--;) {
		data[i].draw(ctx);
	}
}

function mouseDown(evt) {
	var el = evt.target;

	var px = evt.clientX - el.offsetLeft;
	var py = evt.clientY - el.offsetTop;

	if (px % 120 >= 20 && py % 120 >= 20) {
		var idx = Math.floor(px/120);
		idx += Math.floor(py/120)*3;

		if (data[idx].hasData()) {
			return;
		} 
		data[idx].flip(player);
		player = player === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT;
	}
}

function Tile(x, y) {
	var x = x, y = y;
	var tile = Tile.BLANK;
	var anim = 0;

	if (tile == null) {
		var _c = document.createElement("canvas");
		_c.width = _c.height = 100;
		_ctx = _c.getContext("2d");

		_ctx.fillStyle = "#574E58";
		_ctx.lineWidth = 4;
		_ctx.strokeStyle = "white";
		_ctx.lineCap = "round"

		// Blank
		_ctx.fillRect(0, 0, 100, 100);
		Tile.BLANK = new Image();
		Tile.BLANK.src = _c.toDataURL();

		// Nought
		_ctx.fillRect(0, 0, 100, 100);

		_ctx.beginPath();
		_ctx.arc(50, 50, 30, 0, 2*Math.PI);
		_ctx.stroke();

		Tile.NOUGHT = new Image();
		Tile.NOUGHT.src = _c.toDataURL();

		// Cross
		_ctx.fillRect(0, 0, 100, 100);

		_ctx.beginPath();
		_ctx.moveTo(20, 20);
		_ctx.lineTo(80, 80);
		_ctx.moveTo(80, 20);
		_ctx.lineTo(20, 80);
		_ctx.stroke();

		Tile.CROSS = new Image();
		Tile.CROSS.src = _c.toDataURL();

		tile = Tile.BLANK;
	}

	this.hasData = function() {
		return tile !== Tile.BLANK;
	}

	this.flip = function(next) {
		tile = next;
		anim = 1;
	}

	this.update = function() {
		if (anim > 0 ) {
			anim -= 0.02;
		}
	}

	this.draw = function(ctx) {
		if (anim <= 0) {
			ctx.drawImage(tile, x, y);
			return;
		}

		var res = 2;
		var t = anim > 0.5 ? Tile.BLANK : tile;
		var p = -Math.abs(2*anim - 1) + 1;

		for (var i=0; i < 100; i += res) {

			var j = 50 - (anim > 0.5 ? 100-i : i);

			ctx.drawImage(t, i, 0, res, 100,
				x + i - p*i + 50*p,
				y - j*p*0.2,
				res,
				100 + j*p*0.4
			)
		}
	}
}









//////////////////////////////////////////////////////////////////////////

// var canvas, ctx;
// var data;
// var player;

// window.onload = function main() {

// 	canvas = document.createElement("canvas");
// 	canvas.width = canvas.height = 3*120 + 20;
// 	ctx = canvas.getContext("2d");

// 	document.body.appendChild(canvas);

// 	canvas.addEventListener("mousedown", mouseDown);

// 	init();
// 	tick();

// }

// function init() {
// 	if (data == null) {
// 		data = [];

// 		for (var i=0; i<9; i++) {
// 			var x = (i % 3)*120 + 20;
// 			var y = Math.floor(i/3)*120 + 20;
// 			data.push(new Tile(x,y));
// 		}
// 	}
// 	// data[0].flip(Tile.NOUGHT);
// 	player = Tile.NOUGHT;
// }


// function tick() {
// 	window.requestAnimationFrame(tick);

// 	update();
// 	render();
// }


// function update() {
// 	for (var i = data.length; i--;) {
// 		data[i].update();
// 	}
// }

// function render() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	for (var i = data.length; i--;) {
// 		data[i].draw(ctx);
// 	}
// }

// function mouseDown(evt) {
// 	var el = evt.target;

// 	var px = evt.clientX - el.offsetLeft;
// 	var py = evt.clientY - el.offsetTop;

// 	// console.log(px+ ", " + py);

// 	if (px % 120 >= 20 && py % 120 >= 20) {
// 		var idx = Math.floor(px/120);
// 		idx += Math.floor(py/120)*3;

// 		if (data[idx].hasData()) {
// 			return;
// 		}
// 		data[idx].flip(player);
// 		player = player === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT;
// 	}
// }

// function Tile(x, y) {
// 	var x = x, y = y;
// 	var tile = Tile.BLANK;
// 	var anim = 0;

// 	if (tile == null) {
// 		var _c = document.createElement("canvas");
// 		_c.width = _c.height = 100;
// 		_ctx = _c.getContext("2d");

// 		_ctx.fillStyle = "skyblue";
// 		_ctx.lineWidth = 4;
// 		_ctx.strokeStyle = "white";
// 		_ctx.lineCap = "round";

// 		// Blank
// 		_ctx.fillRect(0,0,100,100);
// 		Tile.BLANK = new Image();
// 		Tile.BLANK.src = _c.toDataURL();

// 		// Nought
// 		_ctx.fillRect(0,0,100,100);

// 		_ctx.beginPath();
// 		_ctx.arc(50, 50, 30, 0, 2*Math.PI);
// 		_ctx.stroke();

// 		Tile.NOUGHT = new Image();
// 		Tile.NOUGHT.src = _c.toDataURL();

// 		// Cross
// 		_ctx.fillRect(0,0,100,100);

// 		_ctx.beginPath();
// 		_ctx.moveTo(20,20);
// 		_ctx.lineTo(80,80);
// 		_ctx.moveTo(80,20);
// 		_ctx.lineTo(20,80);
// 		_ctx.stroke();

// 		Tile.CROSS = new Image();
// 		Tile.CROSS.src = _c.toDataURL();

// 		tile = Tile.BLANK;
// 	}

// 	this.hasData = function() {
// 		return tile !== Tile.BLANK;
// 	}

// 	this.flip = function(next) {
// 		tile = next;
// 		anim = 1;
// 	}

// 	this.update = function() {
// 		if (anim > 0) {
// 			anim -= 0.02;
// 		}
// 	}

// 	this.draw = function(ctx) {
// 		if (anim <= 0) {
// 			ctx.drawImage(tile, x, y);
// 			return;
// 		}

// 		var res = 2;
// 		var t = anim > 0.5 ? Tile.BLANK : tile;
// 		var p = -Math.abs(2*anim - 1) + 1;

// 		for (var i=0; i < 100; i += res) {
// 			var j = 50 - (anim > 0.5 ? 100 - i : i);


// 			ctx.drawImage(t, i, 0, res, 100,
// 				x + i - p*i + 50*p,
// 				y - i*p*0.2,
// 				res,
// 				100 + j*p*0.4
// 			)
// 		}

// 	}
// }