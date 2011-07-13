$(function(){
				
	module("extender");
	
	/**
	 * Test 1
	 */
	test('extendClass method', function(){
		expect(1);

		ok(($['extendClass']));
	});

	/**
	 * Test 2
	 */
	test('class intances', function(){
		expect(3);

		ok(o1 instanceof myClass1);
		ok(o2 instanceof myClass1);
		ok(o2 instanceof myClass2);
	});

});