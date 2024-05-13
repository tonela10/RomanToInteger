QUnit.test("convertIntegerToRoman Test Cases", function(assert) {
  // Test Cases for convertIntegerToRoman
  
  // TC-1
  assert.propEqual(convertIntegerToRoman(1), {value: "I", message: '', result: true}, "TC-1");
  
  // TC-2
  assert.propEqual(convertIntegerToRoman(3999), {value: "MMMCMXCIX", message: '', result: true}, "TC-2");
  
  // TC-3
  assert.propEqual(convertIntegerToRoman(4000), {value: 0, message: 'Out of range (1-3999)', result: false}, "TC-3");
  
  // TC-4
  assert.propEqual(convertIntegerToRoman(0), {value: 0, message: 'Out of range (1-3999)', result: false}, "TC-4");
  
  // TC-5
  assert.propEqual(convertIntegerToRoman(-100), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-5");
  
  // TC-6
  assert.propEqual(convertIntegerToRoman(3.14), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-6");
});

QUnit.test("convertRomanToInteger Test Cases", function(assert) {
  // Test Cases for convertRomanToInteger
  
  // TC-1
  assert.propEqual(convertRomanToInteger("IV"), {value: 4, message: '', result: true}, "TC-1");
  
  // TC-2
  assert.propEqual(convertRomanToInteger("MMMCMXCIX"), {value: 3999, message: '', result: true}, "TC-2");
  
  // TC-3
  assert.propEqual(convertRomanToInteger(""), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-5");
  
  // TC-4
  assert.propEqual(convertRomanToInteger("X1V"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-6");
  
  // TC-5
  assert.propEqual(convertRomanToInteger("IIV"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-7");
  
  // TC-6
  assert.propEqual(convertRomanToInteger("iv"), {value: 4, message: '', result: true}, "TC-8");
});
