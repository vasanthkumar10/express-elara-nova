const _ = require("lodash");

const items = [1, 2, 3, 4, 5];
// // const chunk = 2; // [1, 2], [3, 4], [5];
const chunk = 2; // [[1, 2, 3], [4, 5]];

console.log(_.chunk(items, chunk));
// const obj = {
//   name: {
//     place: {
//       location: {
//         address: "chennai",
//         age: 20,
//       },
//       address: "delhi",
//     },
//   },
// };

// console.log(Object.hasOwn(obj, "address"));
