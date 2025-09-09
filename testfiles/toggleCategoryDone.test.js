const toggleCategoryDone = require("../toggleCategoryDone");
import { test, expect } from "vitest";

test("when category is marked done, all its tasks should be marked done and priority should be updated", () => {
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

  const result = toggleCategoryDone(categories, "001", true);
  expect(result[0]["_id"]).toBe("002");
  expect(result[1]["_id"]).toBe("003");
  expect(result[2]["_id"]).toBe("001");
  expect(result[2]["priority"]).toBe(3);
  expect(result[2]["isMarkedDone"]).toBe(true);
  expect(result[2]["tasks"][0]["done"]).toBe(true);
  expect(result[2]["tasks"][1]["done"]).toBe(true);
  expect(result[2]["notDone"]).toBe(0);
  expect(result[2]["done"]).toBe(2);
});

test("when category is marked undone, all its tasks should be marked undone and priority should be updated", () => {
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

  const result = toggleCategoryDone(categories, "001", false);
  expect(result[0]["_id"]).toBe("002");

  expect(result[1]["_id"]).toBe("001");
  expect(result[1]["priority"]).toBe(2);
  expect(result[1]["isMarkedDone"]).toBe(false);
  expect(result[1]["tasks"][0]["done"]).toBe(false);
  expect(result[1]["tasks"][1]["done"]).toBe(false);
  expect(result[1]["notDone"]).toBe(2);
  expect(result[1]["done"]).toBe(0);

  expect(result[2]["_id"]).toBe("003");
});
