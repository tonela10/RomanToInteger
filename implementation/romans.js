// Constants for the literals
const INVALID_ROMAN = 'Please enter a valid roman';
const INVALID_INTEGER = 'Please enter a valid integer';
const OUT_OF_RANGE = 'Out of range (1-3999)';

function init() {
  // Load elements once to avoid repetition on every invocation
  const modeCheckbox = document.querySelector('input[type="checkbox"]');
  const header = document.querySelector('h1');
  const convertButton = document.querySelector('.convert-button');
  const outputArea = document.querySelector('.convert-output');
  const inputArea = document.querySelector('input[type="text"]');

  const getModeTitle = (integerToRoman) => integerToRoman ? 'Integer To Roman' : 'Roman To Integer';

  modeCheckbox.addEventListener('change', (e) => {
    header.innerHTML = getModeTitle(e.target.checked);
  });

  convertButton.addEventListener('click', () => {
    const inputValue = inputArea.value;
    const conversion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
    if (conversion.result) {
      outputArea.innerHTML = conversion.value;
    } else {
      alert(conversion.message);
    }
  });
}

// Conversion functions
const convertRomanToInteger = (roman) => {
  const response = { value: 0, message: '', result: false };

  // Regexp to check if a string is a valid roman number
  const romanNumeralRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  roman = roman.toUpperCase();
  const regexResult = romanNumeralRegex.test(roman);

  if (!regexResult || roman.length <= 0) {
    response.message = INVALID_ROMAN;
    return response;
  }

  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
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

const convertIntegerToRoman = (num) => {
  const response = { value: '', message: '', result: false };

  const numberRegex = /^\d+$/;
  const regexResult = numberRegex.test(num);

  if (!regexResult) {
    response.message = INVALID_INTEGER;
    return response;
  }

  num = Number(num);
  if (num > 3999 || num < 1) {
    response.message = OUT_OF_RANGE;
    return response;
  }

  const mapping = { 1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M' };

  let str = '';
  const digits = String(num).split('').reverse();
  digits.forEach((digit, index) => {
    str = digitToRoman(digit, 10 * index, mapping) + str;
  });

  response.value = str;
  response.result = true;
  return response;
};

const digitToRoman = (digit, place, mapping) => {
  const num = digit * place;
  if (num < 10) {
    return lessThan9(num, mapping);
  } else {
    return greaterThan9(num, mapping);
  }
};

const lessThan9 = (num, obj) => {
  if (num === 9) {
    return obj[1] + obj[10];
  } else if (num >= 5) {
    return obj[5] + obj[1].repeat(num % 5);
  } else if (num === 4) {
    return obj[1] + obj[5];
  } else {
    return obj[1].repeat(num);
  }
};

const greaterThan9 = (num, obj) => {
  if (num < 50) {
    if (num === 40) {
      return obj[10] + obj[50];
    }
    return obj[10].repeat(num / 10);
  } else if (num < 100) {
    if (num === 90) {
      return obj[10] + obj[100];
    }
    return obj[50] + obj[10].repeat((num - 50) / 10);
  } else if (num < 500) {
    if (num === 400) {
      return obj[100] + obj[500];
    }
    return obj[100].repeat(num / 100);
  } else if (num < 1000) {
    if (num === 900) {
      return obj[100] + obj[1000];
    }
    return obj[500] + obj[100].repeat((num - 500) / 100);
  } else {
    return obj[1000].repeat(num / 1000);
  }
};

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { convertRomanToInteger, convertIntegerToRoman };
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);