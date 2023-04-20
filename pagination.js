const users = [];

for (let id = 1; id <= 200; id++) {
  users.push({
    id,
    name: `User-${id}`,
  });
}

console.log(users);

// data:
// id -> 1 to 200
// users = 200
// limit = 15

// totalPage -> users/limit = 200 / 15 = 13.33 = 14 pages
// currentPage -> 7 -> data: 91 - 105
// start -> (page - 1) * limit = (7-1) * 15 = 90
// end -> page * limit = 7 * 15 = 105
// condition -> id > start and id <= end
// id => id > 90 and id <= 105 => 91 to 105
