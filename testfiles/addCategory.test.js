const addCategory = require("../addCategory");
import { test, expect } from "vitest";

test("adds a new category to the empty array", () => {
  const categories = [];
  const result = addCategory(categories, "001", "Zname");
  expect(result).toEqual([
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 0,
      notDone: 0,
      total: 0,
      tasks: [],
      isMarkedDone: false,
    },
  ]);
});

test("adds a new category to a non-empty array and sorts it", () => {
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
      tasks: [],
      isMarkedDone: false,
    },
  ];

  const result = addCategory(categories, "002", "Aname", "#FFFFFF", "#FFFFFF");
  expect(result[1]).toEqual({
    _id: "002",
    name: "Aname",
    color: "#FFFFFF",
    border: "#FFFFFF",
    priority: 2,
    done: 0,
    notDone: 0,
    total: 0,
    tasks: [],
    isMarkedDone: false,
  });
});

test("adds a new category to a non-empty array with a done category and places just above done", () => {
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
  expect(result[1]).toEqual({
    _id: "003",
    name: "Zname",
    color: "#FFFFFF",
    border: "#FFFFFF",
    priority: 2,
    done: 0,
    notDone: 0,
    total: 0,
    tasks: [],
    isMarkedDone: false,
  });
});
