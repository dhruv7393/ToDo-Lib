// no change if only single category present
// if new value is same as old value, no change
// if new value is different, update priority of current category to new value
// if new value is higher than old value, decrement priority of categories between old and new by 1
// if new value is lower than old value, increment priority of categories between old and new by 1

import { test, expect } from "vitest";
const updateCategoryPriority = require("../updateCategoryPriority");

test("if new value is higher than old value, decrement priority of categories between old and new by 1", () => {
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
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 2,
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
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
  ];
  const result = updateCategoryPriority(categories, "001", 3);
  expect(result[0]["_id"]).toBe("002");
  expect(result[0]["priority"]).toBe(1);
  expect(result[1]["_id"]).toBe("003");
  expect(result[1]["priority"]).toBe(2);
  expect(result[2]["_id"]).toBe("001");
  expect(result[2]["priority"]).toBe(3);
});

test("if new value is higher than old value, decrement priority of categories between old and new by 1", () => {
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
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 2,
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
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
  ];
  const result = updateCategoryPriority(categories, "003", 1);
  expect(result[0]["_id"]).toBe("003");
  expect(result[0]["priority"]).toBe(1);
  expect(result[1]["_id"]).toBe("001");
  expect(result[1]["priority"]).toBe(2);
  expect(result[2]["_id"]).toBe("002");
  expect(result[2]["priority"]).toBe(3);
});

test("if new value is same as old value, no change", () => {
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
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 2,
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
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
  ];
  const result = updateCategoryPriority(categories, "001", 1);
  expect(result[0]["_id"]).toBe("001");
  expect(result[0]["priority"]).toBe(1);
  expect(result[1]["_id"]).toBe("002");
  expect(result[1]["priority"]).toBe(2);
  expect(result[2]["_id"]).toBe("003");
  expect(result[2]["priority"]).toBe(3);
});

test("priority should always be greater then 0", () => {
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
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 2,
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
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
  ];
  const result = updateCategoryPriority(categories, "001", -1);
  expect(result[0]["_id"]).toBe("001");
  expect(result[0]["priority"]).toBe(1);
});

test("priority should always be less than or equal to 0", () => {
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
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 2,
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
      priority: 3,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
  ];
  const result = updateCategoryPriority(categories, "001", 10);
  expect(result[2]["_id"]).toBe("001");
  expect(result[2]["priority"]).toBe(3);
});
