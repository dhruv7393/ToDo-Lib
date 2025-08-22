const sortByKey = require("../index");

// Test data
const testData = [
  { name: "John", age: 30, score: 85 },
  { name: "Alice", age: 25, score: 92 },
  { name: "Bob", age: 35, score: 78 },
  { name: "Charlie", age: 25, score: 90 },
];

function runTests() {
  console.log("Running tests for object-sort-utils...\n");

  let passed = 0;
  let failed = 0;

  // Test 1: Basic ascending sort
  try {
    const result = sortByKey(testData, "age");
    const expected = [25, 25, 30, 35];
    const actual = result.map((item) => item.age);

    if (JSON.stringify(actual) === JSON.stringify(expected)) {
      console.log("✅ Test 1 passed: Basic ascending sort");
      passed++;
    } else {
      console.log("❌ Test 1 failed: Basic ascending sort");
      console.log("Expected:", expected);
      console.log("Actual:", actual);
      failed++;
    }
  } catch (error) {
    console.log("❌ Test 1 failed with error:", error.message);
    failed++;
  }

  // Test 2: Descending sort
  try {
    const result = sortByKey(testData, "score", "desc");
    const expected = [92, 90, 85, 78];
    const actual = result.map((item) => item.score);

    if (JSON.stringify(actual) === JSON.stringify(expected)) {
      console.log("✅ Test 2 passed: Descending sort");
      passed++;
    } else {
      console.log("❌ Test 2 failed: Descending sort");
      console.log("Expected:", expected);
      console.log("Actual:", actual);
      failed++;
    }
  } catch (error) {
    console.log("❌ Test 2 failed with error:", error.message);
    failed++;
  }

  // Test 3: String sorting
  try {
    const result = sortByKey(testData, "name");
    const expected = ["Alice", "Bob", "Charlie", "John"];
    const actual = result.map((item) => item.name);

    if (JSON.stringify(actual) === JSON.stringify(expected)) {
      console.log("✅ Test 3 passed: String sorting");
      passed++;
    } else {
      console.log("❌ Test 3 failed: String sorting");
      console.log("Expected:", expected);
      console.log("Actual:", actual);
      failed++;
    }
  } catch (error) {
    console.log("❌ Test 3 failed with error:", error.message);
    failed++;
  }

  // Test 4: Error handling - invalid array
  try {
    sortByKey("not an array", "key");
    console.log("❌ Test 4 failed: Should throw error for invalid array");
    failed++;
  } catch (error) {
    if (error.message === "First parameter must be an array") {
      console.log("✅ Test 4 passed: Error handling for invalid array");
      passed++;
    } else {
      console.log("❌ Test 4 failed: Wrong error message");
      failed++;
    }
  }

  // Test 5: Error handling - invalid key
  try {
    sortByKey(testData, 123);
    console.log("❌ Test 5 failed: Should throw error for invalid key");
    failed++;
  } catch (error) {
    if (error.message === "Key must be a string") {
      console.log("✅ Test 5 passed: Error handling for invalid key");
      passed++;
    } else {
      console.log("❌ Test 5 failed: Wrong error message");
      failed++;
    }
  }

  // Test 6: Original array not modified
  try {
    const original = [...testData];
    sortByKey(testData, "age");

    if (JSON.stringify(testData) === JSON.stringify(original)) {
      console.log("✅ Test 6 passed: Original array not modified");
      passed++;
    } else {
      console.log("❌ Test 6 failed: Original array was modified");
      failed++;
    }
  } catch (error) {
    console.log("❌ Test 6 failed with error:", error.message);
    failed++;
  }

  // Test 7: Handling undefined values
  try {
    const dataWithUndefined = [
      { name: "John", age: 30 },
      { name: "Alice" }, // missing age
      { name: "Bob", age: 25 },
    ];

    const result = sortByKey(dataWithUndefined, "age");
    const hasUndefinedAtEnd = result[result.length - 1].age === undefined;

    if (hasUndefinedAtEnd) {
      console.log("✅ Test 7 passed: Undefined values placed at end");
      passed++;
    } else {
      console.log("❌ Test 7 failed: Undefined values not handled correctly");
      failed++;
    }
  } catch (error) {
    console.log("❌ Test 7 failed with error:", error.message);
    failed++;
  }

  console.log(`\nTest Results: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("All tests passed! 🎉");
    process.exit(0);
  }
}

runTests();
