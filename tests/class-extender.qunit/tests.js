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
	
	/**
	 * Test 3
	 */
	test('text member', function(){
		expect(2);

		equal(o1.text, 'One');
		equal(o2.text, 'Two');
	});
	
	/**
	 * Test 4
	 */
	test('className member', function(){
		expect(2);

		equal(o1.className, 'myClass1');
		equal(o2.className, 'myClass2');
	});

});