// Constants for the literals
const INVALID_ROMAN = 'Please enter a valid roman';
const INVALID_INTEGER = 'Please enter a valid integer';
const OUT_OF_RANGE = 'Out of range (1-3999)';

function init() { 
  // Load elements once to avoid repetition on every invocation
  var modeCheckbox = document.querySelector('input[type=',checkbox,']');
  var header = document.querySelector('h1');
  var convertButton = document.querySelector('.convert-button');
  var outputArea = document.querySelector('.convert-output');
  var inputArea = document.querySelector('input[type=',text,']');

  modeCheckbox.addEventListener('change', (e) => {
    header.innerHTML = getModeTitle(e.target.checked);
  });

  const getModeTitle = (integerToRoman) => {
    return integerToRoman ? 'Integer To Roman' : 'Roman To Integer';
  };

  // Now, the conversion operation only performs the operation.
  // Extracted actions to this listener: 
  // 1 - Read the UI inputs (inputArea.value)
  // 2 - Write the UI output (outputArea.innerHTML)
  // 3 - Show error messages
  // This is cleaner and also removes code duplications
  convertButton.addEventListener('click', () => {
    let inputValue = inputArea.value;
    let conversion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
    if (conversion.result) {
      outputArea.innerHTML = conversion.value;
    } else {
      alert(conversion.message);
    }
  });
}

// Conversion method for Roman to Integer
const convertRomanToInteger = (roman) => {
  let response = {
    value: 0, 
    message: '',
    result: false 
  };

  // Regexp to check if a string is a valid roman number
  const romanNumeralRegex = new RegExp(
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
  );

  // Convert the string to uppercase so we just have to handle uppercase strings
  roman = roman.toUpperCase();
  const regexResult = romanNumeralRegex.test(roman);

  // Either the string is not a valid roman number or is empty
  if (!regexResult || roman.length <= 0) {
    response.message = INVALID_ROMAN;
    return response;
  }

  // Mapping for roman numeral values
  let values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let sum = 0;
  let prevIndex = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    if (values[roman[i]] >= prevIndex) {
      sum += values[roman[i]];
    } else {
      sum -= values[roman[i]];
    }
    prevIndex = values[roman[i]];
  }

  response.value = sum;
  response.result = true;

  return response;
};

// Conversion method for Integer to Roman
const convertIntegerToRoman = (num) => {
  let response = {
    value: '',
    message: '', 
    result: false 
  };

  // Regexp to check the input is a valid integer
  const numberRegex = new RegExp(/^\d+$/);

  const regexResult = numberRegex.test(num);

  // Not an integer -> we exit with the appropriate message
  if (!regexResult) {
    response.message = INVALID_INTEGER;
    return response;
  }

  // Integer not in the supported range -> exit with the right message
  if (Number(num) > 3999 || Number(num) < 1) {
    response.message = OUT_OF_RANGE;
    return response;   
  }

  // Mapping for integer to roman numerals
  const mapping = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
  };

  // Array of values to iterate
  let values = Object.keys(mapping).sort((a, b) => b - a);

  for (let i = 0; i < values.length; i++) {
    let current = values[i];
    while (num >= current) {
      response.value += mapping[current];
      num -= current;
    }
  }

  response.result = true;
  return response;
};
