$(function(){
				
	module("extender");

	/**
	 * Test 1
	 */
	test('class intances', function(){
		expect(3);

		ok(o1 instanceof myClass1);
		ok(o2 instanceof myClass1);
		ok(o2 instanceof myClass2);
	});

});