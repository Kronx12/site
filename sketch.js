var max_points = 50;
var min_size = 2;
var max_size = 10;
var min_speed = -2;
var max_speed = 2;

var max_dist = 400;
var max_face_dist = 300;

var points_list = [];
var canvas;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('z-index', '-1');
	for (let i = 0;i < max_points;i++) {
		x = Math.floor(Math.random() * width);
		y = Math.floor(Math.random() * height);
		s = Math.floor(Math.random() * (max_size - min_size) + min_size);
		vx = Math.random() * (max_speed - min_speed) + min_speed;
		vy = Math.random() * (max_speed - min_speed) + min_speed;
		c = Math.random() * (255 - 150) + 150;
		points_list.push({x:x, y:y, s:s, vx:vx, vy:vy, c:c});
	}
}

function update() {
	for (let i = 0;i < max_points;i++) {
		points_list[i].x = points_list[i].x + points_list[i].vx;
		points_list[i].y = points_list[i].y + points_list[i].vy;
		if (points_list[i].y >= height)
			points_list[i].vy *= -1;
		else if (points_list[i].y <= 0)
			points_list[i].vy *= -1;
		if (points_list[i].x >= width)
			points_list[i].vx *= -1;
		else if (points_list[i].x <= 0)
		points_list[i].vx *= -1;
	}
}

function draw() {
	update();
	background(0);
	let c = color(255, 255, 255);
	fill(c);
	noStroke();
	for (let i = 0;i < max_points;i++)
		for (let j = i;j < max_points;j++) {
			let tmp_d = dist(points_list[i].x, points_list[i].y, points_list[j].x, points_list[j].y);
			if (tmp_d < max_dist) {
				let tmp_c = color(255, 255, 255, -tmp_d + max_dist);
				stroke(tmp_c);
				strokeWeight((points_list[i].s + points_list[j].s) / 16);
				line(points_list[i].x, points_list[i].y, points_list[j].x, points_list[j].y);
			}
		}
	for (let i = 0;i < max_points;i++)
		for (let j = i + 1;j < max_points;j++)
			for (let k = j + 1;k < max_points;k++) {
				let tmp_di = dist(points_list[i].x, points_list[i].y, points_list[j].x, points_list[j].y);
				let tmp_dj = dist(points_list[j].x, points_list[j].y, points_list[k].x, points_list[k].y);
				let tmp_dk = dist(points_list[i].x, points_list[i].y, points_list[k].x, points_list[k].y);
				if (tmp_di < max_face_dist && tmp_dj < max_face_dist && tmp_dk < max_face_dist) {
					let tmp_c = color(6, 102, 131, (-((tmp_di + tmp_dj + tmp_dk) / 3) + max_face_dist) / 2);
					fill(tmp_c);
					noStroke();
					triangle(points_list[i].x, points_list[i].y,
							 points_list[j].x, points_list[j].y,
							 points_list[k].x, points_list[k].y);
				}
			}
	noStroke();
	fill(c);
	for (let i = 0;i < max_points;i++) {
		let c = color(points_list[i].c, points_list[i].c, points_list[i].c);
		fill(c);
		noStroke();
		circle(points_list[i].x, points_list[i].y, points_list[i].s);
	}
}
