const toggleCategoryDone = require("../toggleCategoryDone");
const toggleTaskDone = require("../toggleTaskDone");
import { test, expect } from "vitest";

test("when task is marked done, check if category needs to be updated and if yes update it", () => {
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
    {
      _id: "003",
      name: "Bname",
      color: "#000000",
      border: "#000000",
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: true,
      tasks: [],
    },
  ];

  const result = toggleTaskDone(categories, "001", "New Task", true);
  expect(result[0]["_id"]).toBe("002");
  expect(result[1]["_id"]).toBe("003");
  expect(result[2]["_id"]).toBe("001");
  expect(result[2]["priority"]).toBe(3);
  expect(result[2]["isMarkedDone"]).toBe(true);
  expect(result[2]["tasks"][0]["done"]).toBe(true);
  expect(result[2]["notDone"]).toBe(0);
  expect(result[2]["done"]).toBe(2);
});

test("when task is marked undone, check if category needs to be updated and if yes update it", () => {
  const categories = [
    {
      _id: "002",
      name: "Bname",
      color: "#000000",
      border: "#000000",
      priority: 1,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
    {
      _id: "003",
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
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 3,
      done: 2,
      notDone: 0,
      total: 2,
      isMarkedDone: true,
      tasks: [
        {
          name: "New Task",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: true,
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

  const result = toggleTaskDone(categories, "001", "New Task", false);
  expect(result[0]["_id"]).toBe("002");

  expect(result[1]["_id"]).toBe("001");
  expect(result[1]["priority"]).toBe(2);
  expect(result[1]["isMarkedDone"]).toBe(false);
  expect(result[1]["tasks"][0]["done"]).toBe(false);
  expect(result[1]["notDone"]).toBe(1);
  expect(result[1]["done"]).toBe(1);

  expect(result[2]["_id"]).toBe("003");
});

test("when task is marked done, check if category needs not be updated do not update it", () => {
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
    {
      _id: "003",
      name: "Bname",
      color: "#000000",
      border: "#000000",
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: true,
      tasks: [],
    },
  ];

  const result = toggleTaskDone(categories, "001", "New Task3", false);
  expect(result[0]["_id"]).toBe("001");
  expect(result[0]["tasks"][1]["done"]).toBe(false);
  expect(result[0]["notDone"]).toBe(2);
  expect(result[0]["done"]).toBe(0);
  expect(result[1]["_id"]).toBe("002");
  expect(result[2]["_id"]).toBe("003");
});
