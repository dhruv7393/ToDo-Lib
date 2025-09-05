const deleteTask = require("../deleteTask");
import { test, expect } from "vitest";

test("deleteTask removes the specified not done task from the category", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 1,
      notDone: 2,
      total: 3,
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
          done: false,
        },
        {
          name: "New Task4",
          notes: "",
          canBeRepeated: false,
          priority: 3,
          done: true,
        },
      ],
    },
  ];

  const result = deleteTask(categories, "001", "New Task");
  expect(result[0]["tasks"].length).toBe(2);
  expect(result[0]["done"]).toBe(1);
  expect(result[0]["notDone"]).toBe(1);
  expect(result[0]["total"]).toBe(2);

  expect(result[0]["tasks"][0]).toEqual({
    name: "New Task3",
    notes: "",
    canBeRepeated: false,
    priority: 1,
    done: false,
  });
  expect(result[0]["tasks"][1]).toEqual({
    name: "New Task4",
    notes: "",
    canBeRepeated: false,
    priority: 2,
    done: true,
  });
});

test("deleteTask removes the specified done task from the category", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 3,
      notDone: 2,
      total: 5,
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
        {
          name: "New Task4",
          notes: "",
          canBeRepeated: false,
          priority: 4,
          done: true,
        },
        {
          name: "New Task5",
          notes: "",
          canBeRepeated: false,
          priority: 5,
          done: true,
        },
      ],
    },
  ];

  const result = deleteTask(categories, "001", "New Task3");
  expect(result[0]["tasks"].length).toBe(4);
  expect(result[0]["done"]).toBe(2);
  expect(result[0]["notDone"]).toBe(2);
  expect(result[0]["total"]).toBe(4);

  expect(result[0]["tasks"][1]).toEqual({
    name: "New Task2",
    notes: "",
    canBeRepeated: false,
    priority: 2,
    done: false,
  });
  expect(result[0]["tasks"][2]).toEqual({
    name: "New Task4",
    notes: "",
    canBeRepeated: false,
    priority: 3,
    done: true,
  });

  expect(result[0]["tasks"][3]).toEqual({
    name: "New Task5",
    notes: "",
    canBeRepeated: false,
    priority: 4,
    done: true,
  });
});

test("deleteTask removes the specified task from the category and updates its priority", () => {
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
          name: "New Task4",
          notes: "",
          canBeRepeated: false,
          priority: 3,
          done: true,
        },
      ],
    },
    {
      _id: "002",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 2,
      done: 1,
      notDone: 2,
      total: 3,
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
          done: false,
        },
        {
          name: "New Task4",
          notes: "",
          canBeRepeated: false,
          priority: 3,
          done: true,
        },
      ],
    },
  ];

  const result = deleteTask(categories, "001", "New Task");
  expect(result[0]["_id"]).toBe("002");
  expect(result[1]["_id"]).toBe("001");
  expect(result[1]["isMarkedDone"]).toBeTruthy();
  expect(result[1]["notDone"]).toBe(0);
  expect(result[1]["total"]).toBe(1);
});
