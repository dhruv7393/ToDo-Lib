const addCategory = require("../addCategory");
const fs = require("fs");

const categories = [
  {
    _id: "001",
    name: "Zname",
    color: "#FFFFFF",
    border: "#FFFFFF",
    priority: 1,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: false,
    tasks: [],
  },
  {
    _id: "002",
    name: "Bname",
    color: "#000000",
    border: "#000000",
    priority: 2,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: true,
    tasks: [],
  },
];

const result = addCategory(categories, "003", "Zname", "#FFFFFF", "#FFFFFF");
fs.writeFileSync("output.json", JSON.stringify(result, null, 2));
