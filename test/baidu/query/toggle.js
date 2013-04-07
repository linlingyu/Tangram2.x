module('baidu.query.toggle')

//新接口
test('新接口：显示或隐藏',function(){

	var div = document.createElement('div');
	document.body.appendChild(div);

	equal(div.style.display,"","default to display;")

	baidu.query(div).toggle();
	equal(div.style.display,"none","not to display");

	baidu.query(div).toggle();
	var dis = div.style.display;
	ok(dis!='none',"change to display");

	baidu.query(div).toggle();
	equal(div.style.display,"none","not to display");

	baidu.query(div).toggle();
	ok(dis!='none',"change to display");

	document.body.removeChild(div);
});

test('新接口：显示或隐藏',function(){

	var css = jQuery("<style type='text/css'>.display-none{display:none;}</style>").appendTo('body');
	var div = jQuery("<div class='display-none'>123</div>").appendTo('body');

	equal(div[0].style.display,'',"no style display");
	equal(div.css('display'),'none',"css display:none");
	baidu.query(div[0]).toggle();
	equal(div[0].style.display,'block',"show");
	equal(div.css('display'),'block',"show");
	baidu.query(div[0]).toggle();
	equal(div[0].style.display,'none',"hide");
	equal(div.css('display'),'none',"hide");

	css.remove();
	div.remove();
});

//兼容1.x接口
test('兼容1.x接口：element',function(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	equal(div.style.display,"","default to display;")
	baidu.query.toggle(div);
	equal(div.style.display,"none","not to display");
	baidu.query.toggle(div);
	equal(div.style.display,"","change to display");
	document.body.removeChild(div);
})

test('兼容1.x接口：id',function(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.id = 'div_id';
	equal(div.style.display,"","default to display;")
	baidu.query.toggle('div_id');
	equal(div.style.display,"none","not to display");
	baidu.query.toggle('div_id');
	equal(div.style.display,"","change to display");
	document.body.removeChild(div);
})


//describe('baidu.query.toggle测试', {
//    '将显示/隐藏的元素切换状态': function(){
//        var oDiv1 = baidu.query.g("div1_toggle");
//
//        value_of(oDiv1.style.display).should_be("");
//        baidu.query.toggle(oDiv1);
//        value_of(oDiv1.style.display).should_be("none");
//        baidu.query.toggle(oDiv1);
//        value_of(oDiv1.style.display).should_be("");
//
//        value_of(baidu.query.g("div2_toggle").style.display).should_be("none");
//        baidu.query.toggle("div2_toggle");
//        value_of(baidu.query.g("div2_toggle").style.display).should_be("");
//        baidu.query.toggle("div2_toggle");
//        value_of(baidu.query.g("div2_toggle").style.display).should_be("none");
//    }/*,1.0.1版本中已不支持多个参数的情况
//	'同时切换多个元素的状态': function() {
//		var oDiv3 = baidu.query.g("div3_toggle");
//		
//		value_of(oDiv3.style.display).should_be("");
//		value_of(baidu.G("div4_toggle").style.display).should_be("none");
//		baidu.query.toggle("div3_toggle", baidu.G("div4_toggle"));
//		value_of(oDiv3.style.display).should_be("none");
//		value_of(baidu.G("div4_toggle").style.display).should_be("");
//		baidu.query.toggle(oDiv3, "div4_toggle");
//		value_of(oDiv3.style.display).should_be("");
//		value_of(baidu.G("div4_toggle").style.display).should_be("none");
//	}*/
//});