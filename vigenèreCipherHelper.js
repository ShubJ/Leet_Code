// The Vigenère cipher is a classic cipher originally developed by Italian cryptographer Giovan Battista Bellaso and published in 1553. It is named after a later French cryptographer Blaise de Vigenère, who had developed a stronger autokey cipher (a cipher that incorporates the message of the text into the key).

// The cipher is easy to understand and implement, but survived three centuries of attempts to break it, earning it the nickname "le chiffre indéchiffrable" or "the indecipherable cipher."

// From Wikipedia:

// The Vigenère cipher is a method of encrypting alphabetic text by using a series of different Caesar ciphers based on the letters of a keyword. It is a simple form of polyalphabetic substitution.

// . . .

// In a Caesar cipher, each letter of the alphabet is shifted along some number of places; for example, in a Caesar cipher of shift 3, A would become D, B would become E, Y would become B and so on. The Vigenère cipher consists of several Caesar ciphers in sequence with different shift values.

// Assume the key is repeated for the length of the text, character by character. Note that some implementations repeat the key over characters only if they are part of the alphabet -- this is not the case here.

// The shift is derived by applying a Caesar shift to a character with the corresponding index of the key in the alphabet.

// Visual representation:

// "my secret code i want to secure"  // message
// "passwordpasswordpasswordpasswor"  // key
// Write a class that, when given a key and an alphabet, can be used to encode and decode from the cipher.

// Example
// var alphabet = 'abcdefghijklmnopqrstuvwxyz';
// var key = 'password';

// // creates a cipher helper with each letter substituted
// // by the corresponding character in the key
// var c = new VigenèreCipher(key, alphabet);

// c.encode('codewars'); // returns 'rovwsoiv'
// c.decode('laxxhsj');  // returns 'waffles'
// Any character not in the alphabet must be left as is. For example (following from above):

// c.encode('CODEWARS'); // returns 'CODEWARS'
// a

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TEST CASES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// describe("Tests", () => {
//     it("test", () => {
//   var abc, key;
//   abc = "abcdefghijklmnopqrstuvwxyz";
//   key = "password"
//   c = new VigenèreCipher(key, abc);

//   Test.assertEquals(c.encode('codewars'), 'rovwsoiv');
//   Test.assertEquals(c.decode('rovwsoiv'), 'codewars');

//   Test.assertEquals(c.encode('waffles'), 'laxxhsj');
//   Test.assertEquals(c.decode('laxxhsj'), 'waffles');

//   Test.assertEquals(c.encode('CODEWARS'), 'CODEWARS');
//   Test.assertEquals(c.decode('CODEWARS'), 'CODEWARS');

//     });
//   });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> My SOLUTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

class VigenèreCipher {
  constructor(key, abc) {
    const shift = key.split("").map((char) => abc.indexOf(char));
    const alphaLength = abc.length;
    const shiftLength = shift.length;
    this.encode = function (str) {
      return str
        .split("")
        .map((char, i) =>
          abc.indexOf(char) > -1
            ? abc[(abc.indexOf(str[i]) + shift[i % shiftLength]) % alphaLength]
            : char
        )
        .join("");
    };
    this.decode = function (str) {
      return str
        .split("")
        .map((char, i) =>
          abc.indexOf(char) > -1
            ? abc[
                (abc.indexOf(char) - shift[i % shiftLength] + alphaLength) %
                  alphaLength
              ]
            : char
        )
        .join("");
    };
  }
}

var abc, key;
abc = "abcdefghijklmnopqrstuvwxyz";
key = "password";
var c = new VigenèreCipher(key, abc);

console.log(c.encode("codewars")); // rovwsoiv
console.log(c.decode("rovwsoiv")); // codewars

/* How a shift is calculated 
abc = "abcdefghijklmnopqrstuvwxyz"
key = "password"

Index of key in abc i.e p is at index 15.
so for string in encode we will shift first char to it's own index in abc + index of first char of key in abc i.e. 15 which is the shift


so for encoding "codewars" c will Shift ahead to -> 15 (index of p in abc); so now c will be 2(index of c in abc) + 15 = "r" index 17.
so for encoding "codewars" o will Shift ahead to -> 0 (index of a in abc); so now o will be "o" since there is 0 shift.
so for encoding "codewars" d will Shift ahead to -> 18 (index of s in abc); so now d will be 3(index of d in abc) + 18 = "v" index 21.
so for encoding "codewars" e will Shift ahead to -> 18 (index of s in abc); so now e will be 4(index of e in abc) + 18 = "w" index 22.
so for encoding "codewars" w will Shift ahead to -> 22 (index of w in abc); so now w will be 22(index of w in abc) + 22 = 44 % 26(length of abc) =  18 = "s" index 18.
and so on....
*/
