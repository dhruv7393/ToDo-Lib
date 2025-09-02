const addTask = require("../addTask");
import { test, expect } from "vitest";

test("adds a new task to the empty array", () => {
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
  ];
  const result = addTask(categories, "001", { name: "New Task" });
  expect(result[0]["notDone"]).toBe(1);
  expect(result[0]["total"]).toBe(1);
  expect(result[0]["tasks"]).toEqual([
    {
      name: "New Task",
      notes: "",
      canBeRepeated: false,
      priority: 1,
      done: false,
    },
  ]);
});

test("the next task being added should have greater priority then the previous not done one", () => {
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
  const result = addTask(categories, "001", { name: "New Task2" });
  expect(result[0]["tasks"][1]).toEqual({
    name: "New Task2",
    notes: "",
    canBeRepeated: false,
    priority: 2,
    done: false,
  });

  // increased priority of the done task

  expect(result[0]["tasks"][2]).toEqual({
    name: "New Task3",
    notes: "",
    canBeRepeated: false,
    priority: 3,
    done: true,
  });
});

test("change the priority of done category when new task is added", () => {
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
      isMarkedDone: true,
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
  const result = addTask(categories, "002", { name: "New Task1" });
  expect(result[0]["_id"]).toBe("002");
  expect(result[0]["priority"]).toBe(1);
});
