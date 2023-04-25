const express = require("express");
const app = express();

app.use(express.json());

const users = [];

for (let id = 1; id <= 200; id++) {
  if (id % 3 === 0) continue;
  users.push({
    id,
    name: `User-${id}`,
  });
}

// console.log(users);

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

// From front end -> limit, page
app.post("/users", (req, res) => {
  const { limit, page } = req.body;
  const start = (page - 1) * limit;
  const end = page * limit;

  const usersData = users.filter(
    (user, index) => index + 1 > start && index < end
  );

  const pagination = {
    totalPages: Math.ceil(users.length / limit),
    currentPage: page,
    totalUsers: users.length,
  };
  return res.status(200).json({
    data: usersData,
    pagination,
  });
});

app.listen(5000, () => console.log("server running on 5000...."));
