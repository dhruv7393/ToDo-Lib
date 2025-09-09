const fs = require("fs");
const chron = require("../chron");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const categories = [
  {
    _id: "001",
    name: "Zname",
    color: "#FFFFFF",
    border: "#FFFFFF",
    priority: 1,
    done: 3,
    notDone: 0,
    total: 3,
    isMarkedDone: false,
    tasks: [
      {
        name: "New Task1",
        notes: "",
        canBeRepeated: false,
        priority: 1,
        done: true,
      },
      {
        name: "New Task2",
        notes: "",
        canBeRepeated: false,
        priority: 2,
        done: true,
      },
      {
        name: "New Task3",
        notes: "",
        canBeRepeated: false,
        priority: 3,
        done: true,
      },
    ],
  },
  {
    _id: "002",
    name: "Bname",
    color: "#000000",
    border: "#000000",
    priority: 4,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: true,
    tasks: [],
  },

  {
    _id: "003",
    name: "Bname",
    color: "#000000",
    border: "#000000",
    priority: 4,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: false,
    tasks: [],
  },

  {
    _id: "004",
    name: "Zname",
    color: "#FFFFFF",
    border: "#FFFFFF",
    priority: 1,
    done: 2,
    notDone: 0,
    total: 2,
    isMarkedDone: true,
    tasks: [
      {
        name: "New Task1",
        notes: "",
        canBeRepeated: true,
        priority: 1,
        done: true,
        when: daysOfWeek[
          new Date(new Date().getTime() + 48 * 60 * 60 * 1000).getDay()
        ],
      },
      {
        name: "New Task2",
        notes: "",
        canBeRepeated: true,
        priority: 2,
        done: true,
        when: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
          .getDate()
          .toString(),
      },
      {
        name: "New Task3",
        notes: "",
        canBeRepeated: false,
        priority: 2,
        done: true,
        when: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
          .getDate()
          .toString(),
      },
    ],
  },
];
const result = chron(categories);

fs.writeFileSync("output.json", JSON.stringify(result, null, 2));
