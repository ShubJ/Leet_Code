// Instructions
// Given a mathematical expression as a string you must return the result as a number.

// Numbers
// Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.

// Operators
// You need to support the following mathematical operators:

// Multiplication *
// Division / (as floating point division)
// Addition +
// Subtraction -
// Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.

// Parentheses
// You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

// Whitespace
// There may or may not be whitespace between numbers and operators.

// An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e all of the following are valid expressions.

// 1-1    // 0
// 1 -1   // 0
// 1- 1   // 0
// 1 - 1  // 0
// 1- -1  // 2
// 1 - -1 // 2

// 6 + -(4)   // 2
// 6 + -( -4) // 10
// And the following are invalid expressions

// 1 - - 1    // Invalid
// 1- - 1     // Invalid
// 6 + - (4)  // Invalid
// 6 + -(- 4) // Invalid

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Test Cases>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// describe("Tests", () => {
//     it("test", () => {
//   const tests = [
//     ['1+1', 2],
//     ['1 - 1', 0],
//     ['1* 1', 1],
//     ['1 /1', 1],
//     ['-123', -123],
//     ['123', 123],
//     ['2 /2+3 * 4.75- -6', 21.25],
//     ['12* 123', 1476],
//     ['2 / (2 + 3) * 4.33 - -6', 7.732],
//   ];

//   for ( const [input,expected] of tests )
//     Test.assertEquals( calc(input), expected );
//     });
//   });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Special Test cases >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// "(1 - 2) + -(-(-(-4)))"
// "12* 123/-(-5 + 2)"
// "(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11)"
// "((2.33 / (2.9+3.5)*4) - -6)"

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Solution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// "2 / (2 + 3) * 4.33 - -6".replace(/\((\d)[ ]*([\+-\/\*])[ ]*(\d)\)/g, "$1$3$2 P")
// "2 / (2+3 + 4) * 4.33 - -6"replace(/\((\d)[ ]*([\+-\/\*])[ ]*(.*)\)/g, "$1,($3),$2")
var calc = function (expression) {
  while (expression.includes("(")) {
    expression = expression.replace(/\(((.*?))\)/g, (match) => {
      return calculate(match);
    });
  }

  expression = calculate(expression);
  return Number(parseFloat(expression).toFixed(6));
};

function calculate(expression) {
  // Calculate --2 as 2
  expression = expression.replace(/-{2}(\d)/g, "$1");

  console.log("\n\nAfter handling --3 as 3 -> ", expression);

  // Calculate (-4) as -4;
  expression = expression.replace(
    /\(([\+-]?\d+\.\d+)\)|\(([\+-]?\d+)\)/g,
    "$1$2"
  );

  console.log("After handling (-4) as -4 -> ", expression);

  // Calculate /
  expression = expression.replace(
    /([-]?\d+\.\d+|[-]?\d+)[ ]*\/[ ]*([-]?\d+\.\d+|[-]?\d+)/g,
    (match, group1, group2) =>
      parseFloat(parseFloat(group1) / parseFloat(group2)).toFixed(10)
  );

  console.log("After handling / -> ", expression);

  // Calculate *
  expression = expression.replace(
    /([-]?\d+\.\d+|[-]?\d+)[ ]*\*[ ]*([-]?\d+\.\d+|[-]?\d+)/g,
    (match, group1, group2) =>
      parseFloat(parseFloat(group1) * parseFloat(group2)).toFixed(10)
  );

  console.log("After handling * -> ", expression);

  // Calculate -
  expression = expression.replace(
    /([-]?\d+\.\d+|[-]?\d+)[ ]*-[ ]*([-]?\d+\.\d+|[-]?\d+)/g,
    (match, group1, group2) =>
      parseFloat(parseFloat(group1) - parseFloat(group2)).toFixed(10)
  );

  console.log("After handling - -> ", expression);

  // Calculate +
  expression = expression.replace(
    /([-]?\d+\.\d+|[-]?\d+)[ ]*\+[ ]*([-]?\d+\.\d+|[-]?\d+)/g,
    (match, group1, group2) =>
      parseFloat(parseFloat(group1) + parseFloat(group2)).toFixed(10)
  );

  console.log("After handling + -> ", expression);
  return expression;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Proper Solution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser

function calc(expr) {
  var expressionToParse = expr.replace(/\s+/g, "").split("");

  function peek() {
    return expressionToParse[0] || "";
  }

  function get() {
    return expressionToParse.shift();
  }

  function number() {
    var result = get();
    while ((peek() >= "0" && peek() <= "9") || peek() == ".") {
      result += get();
    }
    return parseFloat(result);
  }

  function factor() {
    if (peek() >= "0" && peek() <= "9") {
      return number();
    } else if (peek() == "(") {
      get(); // '('
      var result = expression();
      get(); // ')'
      return result;
    } else if (peek() == "-") {
      get();
      return -factor();
    }
    return 0; // error
  }

  function term() {
    var result = factor();
    while (peek() == "*" || peek() == "/") {
      if (get() == "*") {
        result *= factor();
      } else {
        result /= factor();
      }
    }
    return result;
  }

  function expression() {
    var result = term();
    while (peek() == "+" || peek() == "-") {
      if (get() == "+") {
        result += term();
      } else {
        result -= term();
      }
    }
    return result;
  }

  return expression();
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Proper Solution 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var calc = function (expression) {
  var tokens = expression.match(/\d+\.\d+|\d+|[-+*/\(\)]/g).map(function (t) {
    return isNaN(t) ? t : Number(t);
  });
  function accept(sym) {
    return tokens[0] == sym && tokens.shift();
  }
  function acceptNumber() {
    return !isNaN(tokens[0]) && tokens.shift();
  }
  function acceptAny(arr) {
    return (
      arr.some(function (a) {
        return a == tokens[0];
      }) && tokens.shift()
    );
  }
  function doOp(x, op, y) {
    return [
      function (a, b) {
        return a + b;
      },
      function (a, b) {
        return a - b;
      },
      function (a, b) {
        return a * b;
      },
      function (a, b) {
        return a / b;
      },
    ]["+-*/".indexOf(op)](x, y);
  }
  function unit() {
    return accept("(") ? ((e = expr()), accept(")"), e) : acceptNumber();
  }
  function unary() {
    return accept("-") ? -unit() : unit();
  }
  function factor() {
    for (
      var x = unary();
      (op = acceptAny(["*", "/"]));
      x = doOp(x, op, unary())
    );
    return x;
  }
  function expr() {
    for (
      var x = factor();
      (op = acceptAny(["+", "-"]));
      x = doOp(x, op, factor())
    );
    return x;
  }
  return expr();
};

console.log(calc("((2.33 / (2.9+3.5)*4) - -6)")); // 7.732
