// rite a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

// Assumptions:
// A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII. (No need to handle fancy punctuation.)
// Matches should be case-insensitive, and the words in the result should be lowercased.
// Ties may be broken arbitrarily.
// If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
// Examples:
// top_3_words("In a village of La Mancha, the name of which I have no desire to call to
// mind, there lived not long since one of those gentlemen that keep a lance
// in the lance-rack, an old buckler, a lean hack, and a greyhound for
// coursing. An olla of rather more beef than mutton, a salad on most
// nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
// on Sundays, made away with three-quarters of his income.")
// # => ["a", "of", "on"]

// top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
// # => ["e", "ddd", "aa"]

// top_3_words("  //wont won't won't")
// # => ["won't", "wont"]
// Bonus points (not really, but just for fun):
// Avoid creating an array whose memory footprint is roughly as big as the input text.
// Avoid sorting the entire array of unique words.

// Test Cases >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// describe("Tests", () => {
//     it("test", () => {
//   Test.assertDeepEquals(topThreeWords("a a a  b  c c  d d d d  e e e e e"), ['e','d','a'])

//   Test.assertDeepEquals(topThreeWords("a a c b b"), ['a','b','c'])

//   Test.assertDeepEquals(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),['e','ddd','aa'])

//   Test.assertDeepEquals(topThreeWords("  //wont won't won't "), ["won't", "wont"])

//   Test.assertDeepEquals(topThreeWords("  , e   .. "), ["e"])

//   Test.assertDeepEquals(topThreeWords("  ...  "), [])

//   Test.assertDeepEquals(topThreeWords("  '  "), [])

//   Test.assertDeepEquals(topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
//   mind, there lived not long since one of those gentlemen that keep a lance
//   in the lance-rack, an old buckler, a lean hack, and a greyhound for
//   coursing. An olla of rather more beef than mutton, a salad on most
//   nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
//   on Sundays, made away with three-quarters of his income.`), ['a','of','on'])
//   });
//   });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MY SOLUTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// function topThreeWords(text) {
//   let tempString = text
//     .split(" ")
//     .map((word) => word.trim().replace(/(^\W*|\W*$)/g, ""))
//     .join(" ");
//   let output = [];
//   let tempOutput = [];
//   let runned = 0;

//   while (tempString) {
//     let temp = tempString
//       .trim()
//       .split(" ")[0]
//       .replace(/(^\W*|\W*$)/g, "");
//     let reducedWordRegex = new RegExp("\\b" + temp + "\\b\\W*", "gi");
//     let count = (tempString.match(reducedWordRegex) || []).length;
//     let regex = new RegExp(`\\b${temp}\\b\\W*`, "gi");
//     tempString = tempString.replace(regex, "").trim();

//     if (temp) {
//       let index = tempOutput.findIndex((data) => data.count < count);
//       if (index > -1) {
//         if (tempOutput.length < 3) {
//           tempOutput.splice(index, 0, { word: temp.toLowerCase(), count });
//         } else {
//           tempOutput.pop();
//           tempOutput.splice(index, 0, { word: temp.toLowerCase(), count });
//         }
//         tempOutput[index] = { word: temp.toLowerCase(), count };
//       } else if (tempOutput.length < 3) {
//         tempOutput.push({ word: temp.toLowerCase(), count: count });
//       }
//     }
//   }
//   tempOutput.map((data) => output.push(data.word));
//   return output;
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTUAL SOLUTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let topThreeWords = (text) => {
  let dict = new Map();
  text.replace(/[A-z']+(?=[ ]+|$)/g, (match) => {
    let word = match.toLowerCase();
    dict.set(word, dict.has(word) ? dict.get(word) + 1 : 1);
  });
  dict.delete("'");
  return [...dict]
    .sort((a, b) => b[1] - a[1])
    .map((a) => a[0])
    .slice(0, 3);
};

console.log(topThreeWords(`  , e   .. `));
