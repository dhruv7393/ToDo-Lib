const data = [
  {
    _id: "68b6fa7c4f1072ac4c787891",
    name: "Vision",
    color: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.8)",
    priority: 1,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: false,
    __v: 0,
    tasks: [],
  },
];

const newTaskDetails = {
  name: "ડ્રીમ પાર કામ કઈરું?",
  notes: "",
  canBeRepeated: true,
  done: false,
  when: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday",
  priority: 1,
};
const addTask = require("./addTask");

let result = addTask(data, "68b6fa7c4f1072ac4c787891", newTaskDetails);
console.log(result);
