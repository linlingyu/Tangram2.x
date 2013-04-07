module("baidu.query.getStyle");

test('兼容Magic接口：prepareTest',function(){
	expect(1);
	stop();
	ua.importsrc("baidu.lang.isString", function(){
		start();
		ok(true,'ok');
	}, "baidu.lang.isString", "baidu.query.getStyle");
});


var check = function(dom, options) {

	options = options || {};
	typeof options.beforestart == 'function' && options.beforestart();
	if (baidu.lang.isString(dom)) {
		dom = document.getElementById(dom);
	} else
		dom = dom||document.body.appendChild(document.createElement('div'));
	var style = options.style;
	var value = options.value || 0;

	dom.style[style] = value;
	equal(baidu.query.getStyle(dom, style), value);
	options.remove && document.body.removeChild(dom);
	typeof options.callback == 'function' && options.callback();
};
test("兼容Magic接口：null height ", function() {
	var img = document.createElement('img');
	document.body.appendChild(img);
	check(null, {
		style : 'height',
		value : '25px'
	});

});
// 1
test("兼容Magic接口：style src null", function() {
	var img = document.createElement('img');
	document.body.appendChild(img);
	img.style['src'] = '';
	equal(!baidu.query.getStyle(img, 'src'), true);
});
// 2
test("兼容Magic接口：img height、float", function() {
	var img = document.createElement('img');
	document.body.appendChild(img);
	if (ua.browser['firefox'] || ua.browser['ie']) {
	    img.style.height = 'auto';
	    ok(baidu.query.getStyle(img, 'height'), img.offsetHeight + 'px');
	} else
		check(img, {
			style : 'height',
			value : '0px'
		});
	check(img, {
		style : 'float',
		value : 'none'
	});
});
// 3
test("兼容Magic接口：img height,width by id", function() {
	var img = document.createElement('img');
	img.id = 'img_id';
	document.body.appendChild(img);
	//注意该处设置高度，由于img没有内容，在ff下即使设置高度，高度依然保持是22px的实际高度，是正确现象
	check('img_id', {
        style : 'height',
        value : '22px'
    });
    check('img_id', {
        style : 'width',
        value : '22px'
    });
});
// 4
test("兼容Magic接口：float,color,display", function() {
	stop();
	var div = document.createElement('div');
	var a = document.createElement('a');
	var img = document.createElement('img');
	document.body.appendChild(div);
	div.innerHTML = '<div style="float:left;"></div>';
	div.appendChild(a);
	div.appendChild(img);
	div.id = 'div_id';
	a.id = 'a_id';
	div.style.color = 'red';
	equal(baidu.query.getStyle(div.getElementsByTagName('div')[0], 'float'), 'left');
	
	
//	check(div, {
//		style : 'float',
//		value : 'left'
//	});
	
	
	var color = baidu.query.getStyle(div, 'color').toLowerCase();
	ok(color === '#ff0000' || color === 'red' || color === 'rgb(255, 0, 0)', 'color red');
	check(img, {
		style : 'display',
		value : 'block'
	});
	start();
	document.body.removeChild(div);
});
// 5
/** css加载也需要时间 * */
test("兼容Magic接口：get style from css file", function() {
	stop();
	var div = document.createElement('div');
	var div1 = document.createElement('div');
	var img = document.createElement('img');
	var p = document.createElement('p');
	var link = document.createElement('link');
	document.body.appendChild(div);
	document.body.appendChild(div1);
	var head = document.getElementsByTagName("head").item(0);
	div.appendChild(p);
	div.appendChild(img);
	$(div).prop('className', "content");
	$(div1).prop('className', 'content');
	$(img).prop('className', 'content');
	$(p).prop('className', 'pid');

	var handle = function() {
		/** IE的float属性叫styleFloat，firefox则是cssFloat * */
		check(div, {
			style : 'float',
			value : 'left'
		});
		check(div, {
			style : 'width',
			value : '200px'
		});
		var color = baidu.query.getStyle(div, 'color').toLowerCase();
		ok(color == '#00ff00' || color == 'rgb(0,255,0)'
				|| color == 'rgb(0, 255, 0)', 'color');
		check(div, {
			style : 'position',
			value : 'relative'
		});
		/** IE的float属性叫styleFloat，firefox则是cssFloat */
		check(img, {
			style : 'float',
			value : 'left'
		});
		check(img, {
			style : 'display',
			value : 'block'
		});
		check(img, {
			style : 'left',
			value : '50px'
		});
		check(img, {
			style : 'width',
			value : '200px'
		});
		check(p, {
			style : 'font-size',
			value : '14px'
		});
		document.body.removeChild(div);
		document.body.removeChild(div1);
		start();
	};

	ua.loadcss(upath + 'style.css', handle, 'content', 'width', '200px');
});

test("兼容Magic接口：null style ", function() {
	var div = document.createElement('div');
    document.body.appendChild(div);
    var div1 = document.createElement('div');
    $(div1).css("height", "10px").css("width", "10px");
    div.appendChild(div1);
    equals(baidu.query.getStyle(div, "height"), div.offsetHeight + "px", "The height is right");//IE下不会返回auto
    equals(baidu.query.getStyle(div, "width"), document.body.offsetWidth + "px", "The width is right");//IE下不会返回auto
});
