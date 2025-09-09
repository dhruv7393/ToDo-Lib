import { test, expect } from "vitest";
const cron = require("../chron");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

test("do not delete task if can be repeated", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 2,
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
          canBeRepeated: true,
          priority: 2,
          done: true,
          when: new Date().getDate().toString(),
        },
        {
          name: "New Task3",
          notes: "",
          canBeRepeated: true,
          priority: 3,
          done: true,
          when: daysOfWeek[new Date().getDay()],
        },
      ],
    },
  ];
  const result = cron(categories);
  expect(result[0]["done"]).toBe(0);
  expect(result[0]["notDone"]).toBe(3);
});

test("delete task if done and change priority of others", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 3,
      notDone: 0,
      total: 2,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: true,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: true,
          priority: 2,
          done: true,
          when: new Date().getDate().toString(),
        },
        {
          name: "New Task3",
          notes: "",
          canBeRepeated: true,
          priority: 3,
          done: true,
          when: daysOfWeek[new Date().getDay()],
        },
      ],
    },
  ];
  const result = cron(categories);
  expect(result[0]["done"]).toBe(0);
  expect(result[0]["notDone"]).toBe(2);
  expect(result[0]["tasks"][0]["name"]).toBe("New Task3");
  expect(result[0]["tasks"][0]["priority"]).toBe(1);
  expect(result[0]["tasks"][1]["name"]).toBe("New Task2");
  expect(result[0]["tasks"][1]["priority"]).toBe(2);
});

test("remove when if task has to be done today or prior or is empty", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 2,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: false,
          when: new Date().toISOString(),
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: false,
          when: new Date(
            new Date().getTime() - 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          name: "New Task3",
          notes: "",
          canBeRepeated: true,
          priority: 3,
          done: true,
          when: new Date(
            new Date().getTime() + 120 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          name: "New Task4",
          notes: "",
          canBeRepeated: false,
          priority: 4,
          done: false,
          when: "",
        },
      ],
    },
  ];
  const result = cron(categories);

  expect(Object.keys(result[0]["tasks"][0]).includes("when")).toBe(false);
  expect(Object.keys(result[0]["tasks"][1]).includes("when")).toBe(false);
  expect(Object.keys(result[0]["tasks"][2]).includes("when")).toBe(true);
  expect(Object.keys(result[0]["tasks"][3]).includes("when")).toBe(false);
});

test("do not update done task if when is in future", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 2,
      notDone: 1,
      total: 2,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: true,
          priority: 1,
          done: true,
          when: daysOfWeek[
            new Date(new Date().getTime() + 48 * 60 * 60 * 1000).getDay()
          ],
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: true,
          priority: 2,
          done: true,
          when: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
            .getDate()
            .toString(),
        },
      ],
    },
  ];
  const result = cron(categories);
  expect(result[0]["tasks"][0]["done"]).toBe(true);
  expect(result[0]["tasks"][1]["done"]).toBe(true);
});

test("delete category if all tasks are done and none can be repeated or has no tasks", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 1,
      notDone: 0,
      total: 1,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: true,
        },
      ],
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
      _id: "003",
      name: "Bname",
      color: "#000000",
      border: "#000000",
      priority: 4,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },
  ];
  const result = cron(categories);
  expect(result.length).toBe(0);
});

test("do not delete category if all tasks are done but some can be repeated", () => {
  const categories = [
    {
      _id: "001",
      name: "Zname",
      color: "#FFFFFF",
      border: "#FFFFFF",
      priority: 1,
      done: 3,
      notDone: 0,
      total: 3,
      isMarkedDone: false,
      tasks: [
        {
          name: "New Task1",
          notes: "",
          canBeRepeated: false,
          priority: 1,
          done: true,
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: true,
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
      _id: "003",
      name: "Bname",
      color: "#000000",
      border: "#000000",
      priority: 4,
      done: 0,
      notDone: 0,
      total: 0,
      isMarkedDone: false,
      tasks: [],
    },

    {
      _id: "004",
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
          name: "New Task1",
          notes: "",
          canBeRepeated: true,
          priority: 1,
          done: true,
          when: daysOfWeek[
            new Date(new Date().getTime() + 48 * 60 * 60 * 1000).getDay()
          ],
        },
        {
          name: "New Task2",
          notes: "",
          canBeRepeated: true,
          priority: 2,
          done: true,
          when: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
            .getDate()
            .toString(),
        },
        {
          name: "New Task3",
          notes: "",
          canBeRepeated: false,
          priority: 2,
          done: true,
          when: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
            .getDate()
            .toString(),
        },
      ],
    },
  ];
  const result = cron(categories);
  expect(result.length).toBe(1);
  expect(result[0].tasks.length).toBe(2);
});
