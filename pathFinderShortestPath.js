// You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return the minimal number of steps to exit position [N-1, N-1] if it is possible to reach the exit from the starting position. Otherwise, return false.

// Empty positions are marked .. Walls are marked W. Start and exit positions are guaranteed to be empty in all test cases.

// function testMaze(expected, maze){
//     let actual = pathFinder(maze);
//     Test.assertEquals(actual, expected, maze);
//   }

//   describe("Basic tests", function(){

//   testMaze(4,
//   `.W.
//   .W.
//   ...`);

//   testMaze(false,
//   `.W.
//   .W.
//   W..`);

//   testMaze(10,
//   `......
//   ......
//   ......
//   ......
//   ......
//   ......`);

//   testMaze(false,
//   `......
//   ......
//   ......
//   ......
//   .....W
//   ....W.`);

//   });

// [
//     0, 1, 2, 3, 4,
//     1, 2, W, 4, 5,
//     2, 3, 4, 5, W,
//     3, 4, 5, 6, 7,
//     4, 5, W, W, 8
// ];

// >>>>>>>>>>>>>> My Code

// function pathFinder(maze) {
//   if (maze == ".") return 0;
//   let actualMaze = maze.split("\n");
//   let dimension = actualMaze.length - 1;
//   for (let p = 0; p <= dimension; p++) {
//     actualMaze[p] = actualMaze[p].trim().split("");
//   }
//   let step = 1;
//   let output = [];
//   let isPossible = true;
//   let startPoints = [[0, 0]];
//   while (isPossible) {
//     let nextPoints = [];
//     for (let i = 0; i < startPoints.length; i++) {
//       let x = startPoints[i][0];
//       let y = startPoints[i][1];

//       if (actualMaze[x - 1] && actualMaze[x - 1][y] == ".") {
//         move(x - 1, y, step, actualMaze);
//         uniqueNextPoints(nextPoints, x - 1, y);
//       }
//       if (actualMaze[x][y + 1] && actualMaze[x][y + 1] == ".") {
//         move(x, y + 1, step, actualMaze);
//         uniqueNextPoints(nextPoints, x, y + 1);
//       }
//       if (actualMaze[x + 1] && actualMaze[x + 1][y] == ".") {
//         move(x + 1, y, step, actualMaze);
//         uniqueNextPoints(nextPoints, x + 1, y);
//       }
//       if (actualMaze[x][y - 1] && actualMaze[x][y - 1] == ".") {
//         move(x, y - 1, step, actualMaze);
//         uniqueNextPoints(nextPoints, x, y - 1);
//       }
//       var reachedDestination = nextPoints.some(
//         (indexes) =>
//           JSON.stringify(indexes) == JSON.stringify([dimension, dimension])
//       );

//       if (reachedDestination) output.push(step);
//     }

//     if (nextPoints.length == 0 || reachedDestination) break;
//     step++;
//     startPoints = [...nextPoints];
//   }
//   if (output.length > 0) return Math.min(...output);
//   else return false;
// }

// function move(indexX, indexY, step, actualMaze) {
//   actualMaze[indexX][indexY] = step;
// }

// function uniqueNextPoints(nextPoints, indexX, indexY) {
//   if (
//     !nextPoints.some(
//       (data) => JSON.stringify(data) == JSON.stringify([indexX, indexY])
//     )
//   )
//     nextPoints.push([indexX, indexY]);
// }

// Proper Solution
function pathFinder(maze) {
  const matrix = maze.split`\n`.map((row) => row.trim().split``);
  const queue = [{ x: 0, y: 0, len: 0 }];
  const n = matrix.length - 1;

  while (queue.length) {
    console.log(queue);
    const { x, y, len } = queue.shift();
    if (x == n && y == n) {
      return len;
    }
    matrix[x][y] = "W";
    [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].forEach(([t1, t2]) => {
      if (matrix[t1] && matrix[t1][t2] && matrix[t1][t2] != "W") {
        queue.push({ x: t1, y: t2, len: len + 1 });
        matrix[t1][t2] = "W";
      }
    });
  }
  return false;
}

console.log(
  pathFinder(`.W...W...W...
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  .W.W.W.W.W.W.
  ...W...W...W.`)
);
