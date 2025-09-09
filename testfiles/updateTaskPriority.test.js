// no change if only single category present
// if new value is same as old value, no change
// if new value is different, update priority of current category to new value
// if new value is higher than old value, decrement priority of categories between old and new by 1
// if new value is lower than old value, increment priority of categories between old and new by 1

import { test, expect } from "vitest";
const updateCategoryPriority = require("../updateCategoryPriority");
const updateTaskPriority = require("../updateTaskPriority");

test("if new value is higher than old value, decrement priority of categories between old and new by 1", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 3,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: false,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
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
  ];
  const result = updateTaskPriority(categories, "001", "New Task1", 3);
  expect(result[0]["tasks"][0]["name"]).toBe("New Task2");
  expect(result[0]["tasks"][0]["priority"]).toBe(1);
  expect(result[0]["tasks"][1]["name"]).toBe("New Task3");
  expect(result[0]["tasks"][1]["priority"]).toBe(2);
  expect(result[0]["tasks"][2]["name"]).toBe("New Task1");
  expect(result[0]["tasks"][2]["priority"]).toBe(3);
});

test("if new value is higher than old value, decrement priority of categories between old and new by 1", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 3,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: false,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
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
  ];
  const result = updateTaskPriority(categories, "001", "New Task3", 1);
  expect(result[0]["tasks"][0]["name"]).toBe("New Task3");
  expect(result[0]["tasks"][0]["priority"]).toBe(1);
  expect(result[0]["tasks"][1]["name"]).toBe("New Task1");
  expect(result[0]["tasks"][1]["priority"]).toBe(2);
  expect(result[0]["tasks"][2]["name"]).toBe("New Task2");
  expect(result[0]["tasks"][2]["priority"]).toBe(3);
});

test("if new value is same as old value, no change", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 3,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: false,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
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
  ];
  const result = updateTaskPriority(categories, "001", "New Task1", 1);
  expect(result[0]["tasks"][0]["name"]).toBe("New Task1");
  expect(result[0]["tasks"][0]["priority"]).toBe(1);
});

test("priority should always be greater then 0", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 3,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: false,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
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
  ];
  const result = updateTaskPriority(categories, "001", "New Task1", -1);
  expect(result[0]["tasks"][0]["name"]).toBe("New Task1");
  expect(result[0]["tasks"][0]["priority"]).toBe(1);
});

test("priority should always be less than or equal to 0", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 3,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: false,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
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
  ];
  const result = updateTaskPriority(categories, "001", "New Task1", 10);
  expect(result[0]["tasks"][2]["name"]).toBe("New Task1");
  expect(result[0]["tasks"][2]["priority"]).toBe(3);
});
