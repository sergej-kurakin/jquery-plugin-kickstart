$(function(){
				
	module("extender");

	/**
	 * Test 1
	 */
	test('init', function(){
		expect(3);

		ok(o1 instanceof myClass1);
		ok(o2 instanceof myClass1);
		ok(o2 instanceof myClass2);
	});

});