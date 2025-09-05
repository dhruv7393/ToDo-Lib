const deleteCategoryById = require("../deleteCategoryById");
import { test, expect } from "vitest";

test("deleteCategoryById removes the category with the specified ID", () => {
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
      _id: "003",
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
      _id: "005",
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
      _id: "004",
      name: "Bname",
      color: "#000000",
      border: "#000000",
      priority: 5,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: true,
      tasks: [],
    },
  ];

  const result = deleteCategoryById(categories, "003");
  expect(result[0]["_id"]).toBe("001");
  expect(result[0]["priority"]).toBe(1);
  expect(result[1]["_id"]).toBe("005");
  expect(result[1]["priority"]).toBe(2);
  expect(result[2]["_id"]).toBe("002");
  expect(result[2]["priority"]).toBe(3);
  expect(result[3]["_id"]).toBe("004");
  expect(result[3]["priority"]).toBe(4);
});

test("do not delete category with repeated tasks", () => {
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
      tasks: [
        {
          name: "New Task",
          notes: "",
          canBeRepeated: true,
          when: "15",
          priority: 1,
          done: false,
        },
      ],
    },
  ];

  const result = deleteCategoryById(categories, "001");
  expect(result[0]["_id"]).toBe("001");
});
