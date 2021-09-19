Array.prototype.peek = function () {
  return this[this.length - 1];
};

/**
 * infixToPostfixRe
 * @param {String} reStr - a RegExp in transformed view
 * with explicit contatenations: abc -> a.b.c => result: ab.c.
 */
function infixToPostfixRe(reStr, dontPrint=true) {

  var output = [];
  var stack = [];

  for (var k = 0; k < reStr.length;  k++) {
    // current char
    var c = reStr[k];

    if (c === '(')
      stack.push(c);
    else if (c === ')') {
      while (stack.peek() && stack.peek() != '(') {
        output.push(stack.pop())
      }
      stack.pop(); // pop '('
    }// else work with the stack
    else {
      while (stack.length) {
        var peekedChar = stack.peek();

        var peekedCharPrecedence = precedenceOf(peekedChar);
        var currentCharPrecedence = precedenceOf(c);

        if (peekedCharPrecedence >= currentCharPrecedence) {
          output.push(stack.pop());
        } else {
          break;
        }
      }
      stack.push(c);
    }

  } // end for loop

  while (stack.length)
    output.push(stack.pop());

  var result = output.join("");

  !dontPrint && console.log(reStr, "=>", result);

  return result;

}
//a?(a+b)*?b
//aab+*?b?

// precedence

var precedenceMap = {
  '(': 1,
  '|': 2, // alternate
  '.': 3, // concatenate

  '?': 4, // zero or one
  '*': 4, // zero or more
  '+': 4, // one or one

  '^': 5 // complement

  // else 6

};

function precedenceOf(c) {
  return precedenceMap[c] || 6;
}


export default infixToPostfixRe;
