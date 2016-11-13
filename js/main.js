var map = L.map('map').setView([42.81176,-1.64562], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

function Linea (id, color, textColor) {
	this.id = id;
	this.color = color;
	this.textColor = textColor;
	this.buses = {};
	this.update = function () {
		jQuery.get('http://www.infotuc.es/gadgetParadas/posiciones.php?linea='+this.id+'&t='+Date.now(), this.callback(this));
	};
	this.callback = function (linea) {
		return function (response) {
			res = response.responseText;
			res = res.replace('<html>','');
			res = res.replace('<head/>','');
			res = res.replace('<body>','');
			res = res.replace('<body/>','');
			res = res.replace('</html>','');
			if (res!='') {
				res = res.split('***');
				for (i in res) {
					data = res[i].split('||');
					num = data[0];
					lon = data[1];
					lat = data[2];
					if (linea.buses[num]) {
						linea.buses[num].lat=lat;
						linea.buses[num].lon=lon;
					} else {
						linea.buses[num] = new Bus(num,lat,lon,linea);
					};
				};
				linea.show();
			};
			
		};
	};
	this.show = function () {
		for (i in this.buses) {
			this.buses[i].show();
		};
	};

	this.update();
}

function Bus (id, lat, lon, linea) {
	this.id = id;
	this.lat = lat;
	this.lon = lon;
	this.linea = linea;
	this.marker = L.marker([this.lat, this.lon]);
	this.show = function () {
		map.removeLayer(this.marker); 
		myIcon = new L.DivIcon.SVGIcon({
			circleRatio:0,
			circleText:this.linea.id,
			fontSize:19,
			color:'rgb(0,0,0)',
			fontColor:this.linea.textColor,
			fillColor:this.linea.color,
			iconSize:{x:32,y:48},
			fillOpacity:1,
		});
		this.marker = L.marker([this.lat, this.lon], {icon: myIcon});
		this.marker.addTo(map);
	};
}

l1 = new Linea('1', 'rgb(153,142,7)','rgb(255,255,255)');
l2 = new Linea('2', 'rgb(140,38,51)','rgb(255,255,255)');
l3 = new Linea('3', 'rgb(206,38,124)','rgb(255,255,255)');
l4 = new Linea('4', 'rgb(216,30,5)','rgb(255,255,255)');
l5 = new Linea('5', 'rgb(12,28,140)','rgb(255,255,255)');
l6 = new Linea('6', 'rgb(178,107,112)','rgb(255,255,255)');
l7 = new Linea('7', 'rgb(0,158,73)','rgb(255,255,255)');
l8 = new Linea('8', 'rgb(158,35,135)','rgb(255,255,255)');
l9 = new Linea('9', 'rgb(226,140,5)','rgb(255,255,255)');
l10 = new Linea('10', 'rgb(237,114,170)','rgb(255,255,255)');
l11 = new Linea('11', 'rgb(0,114,198)','rgb(255,255,255)');
l12 = new Linea('12', 'rgb(127,186,0)','rgb(255,255,255)');
l14 = new Linea('14', 'rgb(0,165,219)','rgb(255,255,255)');
l15 = new Linea('15', 'rgb(191,147,204)','rgb(255,255,255)');
l16 = new Linea('16', 'rgb(0,175,147)','rgb(255,255,255)');
l17 = new Linea('17', 'rgb(145,51,56)','rgb(255,255,255)');
l18 = new Linea('18', 'rgb(33,91,51)','rgb(255,255,255)');
l19 = new Linea('19', 'rgb(0,158,160)','rgb(255,255,255)');
l20 = new Linea('20', 'rgb(155,79,25)','rgb(255,255,255)');
l21 = new Linea('21', 'rgb(96,124,140)','rgb(255,255,255)');
l23 = new Linea('23', 'rgb(107,28,64)','rgb(255,255,255)');
l24 = new Linea('24', 'rgb(252,216,86)','rgb(255,255,255)');
l25 = new Linea('25', 'rgb(107,201,219)','rgb(255,255,255)');

n1 = new Linea('N1', 'rgb(226,140,5)','rgb(255,255,255)');
n2 = new Linea('N2', 'rgb(135,96,40)','rgb(255,255,255)');
n3 = new Linea('N3', 'rgb(96,145,145)','rgb(255,255,255)');
n4 = new Linea('N4', 'rgb(127,160,140)','rgb(255,255,255)');
n5 = new Linea('N5', 'rgb(214,96,109)','rgb(255,255,255)');
n6 = new Linea('N6', 'rgb(122,30,153)','rgb(255,255,255)');
n7 = new Linea('N7', 'rgb(140,112,107)','rgb(255,255,255)');
n8 = new Linea('N8', 'rgb(173,0,117)','rgb(255,255,255)');
n9 = new Linea('N9', 'rgb(249,214,22)','rgb(255,255,255)');
n10 = new Linea('N10', 'rgb(0,165,219)','rgb(255,255,255)');

j=0;
setTimeout(function () {
	setInterval(actualizar,500);
},5000);


function actualizar () {
	j++;
	if (j>=34) {
		j = 1;
	};
	console.log(j);
	switch(j) {
		case 1: l1.update(); break;
		case 2: l2.update(); break;
		case 3: l3.update(); break;
		case 4: l4.update(); break;
		case 5: l5.update(); break;
		case 6: l6.update(); break;
		case 7: l7.update(); break;
		case 8: l8.update(); break;
		case 9: l9.update(); break;
		case 10: l10.update(); break;
		case 11: l11.update(); break;
		case 12: l12.update(); break;
		case 13: l14.update(); break;
		case 14: l15.update(); break;
		case 15: l16.update(); break;
		case 16: l17.update(); break;
		case 17: l18.update(); break;
		case 18: l19.update(); break;
		case 19: l20.update(); break;
		case 20: l21.update(); break;
		case 21: l23.update(); break;
		case 22: l24.update(); break;
		case 23: l25.update(); break;

		case 24: n1.update(); break;
		case 25: n2.update(); break;
		case 26: n3.update(); break;
		case 27: n4.update(); break;
		case 28: n5.update(); break;
		case 29: n6.update(); break;
		case 30: n7.update(); break;
		case 31: n8.update(); break;
		case 32: n9.update(); break;
		case 33: n10.update(); break;
	}
}