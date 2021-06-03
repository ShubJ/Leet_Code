// Snail Sort
// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]
// For better understanding, please follow the numbers of the next array consecutively:

// array = [[1,2,3],
//          [8,9,4],
//          [7,6,5]]
// snail(array) #=> [1,2,3,4,5,6,7,8,9]

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Test Cases >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// describe("Tests", () => {
//     it("test", () => {
//   Test.assertDeepEquals(snail([[]]), []);
//   Test.assertDeepEquals(snail([[1]]), [1]);
//   Test.assertDeepEquals(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
//   Test.assertDeepEquals(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]), [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);
//   Test.assertDeepEquals(snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
//   });
//   });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> My Solution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// snail = function (array) {
//   let direction = ">";
//   let output = [];
//   let x = (y = 0);
//   let iterations = array.length * array[0].length;

//   while (iterations > 0) {
//     console.log(array, direction, x, y);
//     output.push(array[x][y]);
//     array[x][y] = ".";
//     if (direction == ">" && array[x][y + 1] && array[x][y + 1] != ".") y++;
//     else if (direction == ">" && array[x + 1]) {
//       direction = "V";
//       x++;
//     } else if (direction == "V" && array[x + 1] && array[x + 1][y] != ".") x++;
//     else if (direction == "V" && array[x][y - 1]) {
//       direction = "<";
//       y--;
//     } else if (direction == "<" && array[x][y - 1] && array[x][y - 1] != ".")
//       y--;
//     else if (direction == "<" && array[x - 1]) {
//       direction = "^";
//       x--;
//     } else if (direction == "^" && array[x - 1] && array[x - 1][y] != ".") x--;
//     else if (direction == "^" && array[x][y + 1]) {
//       direction = ">";
//       y++;
//     }

//     iterations--;
//   }
//   return output;
// };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Actual Solution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

snail = function (array) {
  var result;
  while (array.length) {
    // Steal the first row.
    result = result ? result.concat(array.shift()) : array.shift();
    // Steal the right items.
    for (var i = 0; i < array.length; i++) result.push(array[i].pop());
    // Steal the bottom row.
    result = result.concat((array.pop() || []).reverse());
    // Steal the left items.
    for (var i = array.length - 1; i >= 0; i--) result.push(array[i].shift());
  }
  return result;
};

console.log(
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
