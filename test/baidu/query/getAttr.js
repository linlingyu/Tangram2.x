module('baidu.query.getAttr测试')
/**
 * TODO:should add dom for testing
 */

//加载快捷方式
test('兼容Magic接口：prepareTest',function(){
	expect(1);
	stop();

	//加载快捷方式
    /*
	ua.importsrc("baidu.short", function(){
		start();
		ok(true,'ok');
	}, "baidu.trim", "baidu.query.getAttr");
    */
});


//document没有getAttribute方法，如果调用getAttr方法来获取document的属性会抛出异常，是否有其他途径？？？
test('兼容Magic接口：document的测试',function(){

//	var a = document.createElement('a');
//	document.body.appendChild(a);
//	a.innerHTML = ""
//	document.alinkColor = "#00ff00";
//	document.linkColor = "#ff0000";
//	document.vlinkColor = "#0000ff";
//	document.fgColor = "000000";
//	document.bgColor = "#FFFFFF";
//	
//	alert(baidu.query.getAttr(document,'bgColor'));
	
//	alert(document.documentElement.outerHTML);

});

//新接口

test('兼容Magic接口：基础测试', function() {
	expect(3);
	var div = document.createElement('div');
	div.setAttribute('title',"div_getAttri");
	div.setAttribute('className',"test_div")||div.setAttribute('class',"test_div");
	equal(baidu.query.getAttr(div, "rel"),null,"div gets no rel attribute");
	equal(baidu.query.getAttr(div, "title"),"div_getAttri","div gets title attribute");
	/*IE下使用class,chrome,FF使用className*/
	equal(baidu.query.getAttr(div, "class")||baidu.query.getAttr(div, "className"),"test_div","div gets class attribute");
});

/**
 * 针对所有对象做id判断的用例
 */
test('兼容Magic接口：遍历所有元素类型', function() {
	var eleNames = ('p,h1,h2,h3,h4,h5,h6,blockquote,ol,ul,dl,div,form,a'
			+ ',table,fieldset,address,ins,del,em,strong,q,cite,dfn,abbr'
			+ ',acronym,code,samp,kbd,var,img,object,hr'
			+ ',input,button,label,select,iframe').split(',');
	expect(eleNames.length);
	for(var i = 0; i < eleNames.length; i ++){
		var ele = document.createElement(eleNames[i]);
		ele.setAttribute('id',ele.tagName+"_ele");
		equal(baidu.query.getAttr(ele, 'id'),ele.tagName+"_ele",ele.tagName+" gets id attribute");
	}
});

/**
 * 为一个元素添加多个属性，判断各个属性是否存在
 * 
 */
test('兼容Magic接口：针对一个元素的多个属性进行的判断', function() {
	expect(2);
	var input = null;
	try {
		// IE6/IE7 构建方式
		input = document.createElement('<input name="buttonName">');
	} catch (e) {
		// W3C 构建方式
		input = document.createElement('input');
		input.name = 'buttonName';
	}
	input.type = "button";
	equal(baidu.query.getAttr(input, "type"),'button',"input gets type attribute");
	equal(baidu.query.getAttr(input, "name"),"buttonName","input gets name attribute");
});

/**
 * However, the World Wide Web Consortium (W3C) recommends
 * <li>lowercase attributes/attribute values in their HTML 4 recommendation.
 */
test('兼容Magic接口：针对大写情况下的属性进行判定', function() {
	expect(1);
	// TODO 该情况需要在其他Attribute用例中补充
	var div = document.createElement('div');
	div.setAttribute("NEW_ATTRIBUTE","newAttribute");
	equal(baidu.query.getAttr(div, "NEW_ATTRIBUTE"),"newAttribute","new attribute of Uppercase ");
});

/**
 * <li>class
 * <li>id
 * <li>style
 * <li>title <code>
 class	classname			Specifies a classname for an element
 id		id					Specifies a unique id for an element
 style	style_definition	Specifies an inline style for an element
 title	tooltip_text 		Specifies extra information about an element (displayed as a tool tip)
 * </code>
 */
test('兼容Magic接口：针对特定的默认属性进行测试', function() {
	expect(3);
	var li = document.createElement('li');
	li.setAttribute('className',"li_className");
	li.id = 'li_id';
	li.style.color = "blue";
	li.title = "li_title";
	equal(baidu.query.getAttr(li, "id"),'li_id',"li gets id attribute");
	var style = $.trim(baidu.query.getAttr(li, "style")).toLowerCase();
	
	ok(style=="color: blue"||style=="color: blue;"||style=="color: #0000ff","li gets style attribute : " + style);
	equal(baidu.query.getAttr(li, "title"),"li_title","li gets title attribute");
});


test('兼容Magic接口：特定标签的特定属性测试', function() {
	expect(5);
	var a = document.createElement('a');
	a.charset = 'utf-8';
	a.href = "http://www.baidu.com";
	a.name = "baidu";
	a.target = "_self";
	a.shape = "default";
	ok(baidu.query.getAttr(a, 'charset') == 'utf-8', "charset testing");
	/* IE下为'http://www.baidu.com',chrome下为'http://www.baidu.com/' */
	ok(baidu.query.getAttr(a, 'href') == "http://www.baidu.com"
			|| "http://www.baidu.com/", "href testing");
	ok(baidu.query.getAttr(a, 'name') == 'baidu', "name testing");
	ok(baidu.query.getAttr(a, 'target') == '_self', "target testing");
	ok(baidu.query.getAttr(a, 'shape') == 'default', 'shape testing');
});

/**
 * TODO : add dom for testing
 * 
 */
test(
		'兼容Magic接口：异常case',
		function() {
			expect(2);
			var div = document.createElement('div');
			ok(baidu.query.getAttr(div, "id")==""||baidu.query.getAttr(div, "id")==null,"no name attribute");
			equal(baidu.query.getAttr(div, "name"),null,"no name attribute");
});

