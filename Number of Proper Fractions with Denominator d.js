// Question >>>>>>>>>>>>>>>>>>>>>>>>>>>>

// If n is the numerator and d the denominator of a fraction, that fraction is defined a (reduced) proper fraction if and only if GCD(n,d)==1.

// For example 5/16 is a proper fraction, while 6/16 is not, as both 6 and 16 are divisible by 2, thus the fraction can be reduced to 3/8.

// Now, if you consider a given number d, how many proper fractions can be built using d as a denominator?

// For example, let's assume that d is 15: you can build a total of 8 different proper fractions between 0 and 1 with it: 1/15, 2/15, 4/15, 7/15, 8/15, 11/15, 13/15 and 14/15.

// You are to build a function that computes how many proper fractions you can build with a given denominator:

// Test Cases >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// properFractions(1)==0
// properFractions(2)==1
// properFractions(5)==4
// properFractions(15)==8
// properFractions(25)==20

// describe("Tests", () => {
//     it("test", () => {
//   Test.assertEquals(properFractions(1),0);
//   Test.assertEquals(properFractions(2),1);
//   Test.assertEquals(properFractions(5),4);
//   Test.assertEquals(properFractions(15),8);
//   Test.assertEquals(properFractions(25),20);
//     });
//   });

// >>>>>>>>>>>>>> My Solution
// function properFractions(n) {
//   let result = 0;
//   let multiple = [];
//   for (let i = 1; i < n; i++) {
//     let gcd = 0;
//     if (multiple.includes(i)) continue;
//     if (i > n / 2) {
//       let alreadyCounted = false;
//       for (let p = 0; p < multiple.length; p++) {
//         if (i % multiple[p] == 0) {
//           alreadyCounted = true;
//           break;
//         }
//       }
//       if (alreadyCounted) continue;
//       result += 1;
//       continue;
//     }
//     if (i > 2 && n % i == 0) {
//       multiple.push(i);
//       multiple.push(n / i);
//       continue;
//     }

//     for (let j = 2; j <= parseInt(i / 2); j++) {
//       if (i % j == 0 && n % j == 0) {
//         gcd = 1;
//         break;
//       }
//     }
//     if (!gcd) result += 1;
//   }
//   return result;
// }

// Proper Solution
function properFractions(n) {
  if (n == 1) return 0;
  var facts = getDivisors(n);

  var r = n;
  for (var f of facts) {
    r -= Math.floor(r / f);
  }

  return r;
}

function getDivisors(a) {
  var arr = [];
  var p = 2;
  while (a > 1 && p <= a) {
    if (a % p == 0) {
      a /= p;
      if (!arr.includes(p)) {
        arr.push(p);
      }
    } else {
      p++;
    }
  }
  return arr;
}

// properFractions(15); //9999999
console.log(properFractions(9999999));
