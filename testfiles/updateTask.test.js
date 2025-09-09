import { test, expect } from "vitest";
const updateTask = require("../UpdateTask");

test("retain notes if not provided in updateDetails", () => {
  const categories = [
    {
      _id: "001",
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
          name: "New Task",
          notes: "Has notes",
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

  const result = updateTask(categories, "001", "New Task", {
    canBeRepeated: true,
  });
  expect(result[0]["tasks"][0]["notes"]).toBe("Has notes");
});

test("remove when if task is scheduled for today", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 0,
      notDone: 2,
      total: 2,
      isMarkedDone: true,
      tasks: [
        {
          name: "New Task",
          notes: "Has notes",
          canBeRepeated: false,
          priority: 1,
          done: false,
          when: new Date().toISOString(),
        },
        {
          name: "New Task3",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
        },
      ],
    },
  ];

  const result = updateTask(categories, "001", "New Task", {
    canBeRepeated: true,
  });
  expect(Object.keys(result[0]["tasks"][0]).includes("when")).toBe(false);
});

test("retain when if task is scheduled for future date", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 0,
      notDone: 2,
      total: 2,
      isMarkedDone: true,
      tasks: [
        {
          name: "New Task",
          notes: "Has notes",
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
      ],
    },
  ];

  const result = updateTask(categories, "001", "New Task", {
    canBeRepeated: true,
    when: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(),
  });
  expect(Object.keys(result[0]["tasks"][0]).includes("when")).toBe(true);
});

test("notes should be added if sent via api", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 0,
      notDone: 2,
      total: 2,
      isMarkedDone: true,
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
      ],
    },
  ];

  const result = updateTask(categories, "001", "New Task", {
    notes: "New Notes",
  });
  expect(result[0]["tasks"][0]["notes"]).toBe("New Notes");
});
