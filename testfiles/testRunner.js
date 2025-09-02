const addCategory = require("../addCategory");
const fs = require("fs");
const { addNewTask } = require("../utilsForVaccation");

const categories = [
  {
    _id: "001",
    name: "Zname",
    color: "#FFFFFF",
    border: "#FFFFFF",
    priority: 1,
    done: 1,
    notDone: 1,
    total: 2,
    isMarkedDone: false,
    tasks: [
      {
        name: "New Task",
        notes: "",
        canBeRepeated: false,
        priority: 1,
        done: false,
      },
      {
        name: "New Task3",
        notes: "",
        canBeRepeated: false,
        priority: 2,
        done: true,
      },
    ],
  },
];

const result = addNewTask(categories, "001", { name: "New Task2" });
fs.writeFileSync("output.json", JSON.stringify(result, null, 2));
