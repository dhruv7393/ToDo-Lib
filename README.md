# Object Sort Utils

A lightweight utility library for sorting arrays of objects by any key with support for both ascending and descending order.

## Installation

```bash
npm install object-sort-utils
```

## Usage

```javascript
const sortByKey = require("object-sort-utils");

// Example data
const users = [
  { name: "John", age: 30, score: 85 },
  { name: "Alice", age: 25, score: 92 },
  { name: "Bob", age: 35, score: 78 },
];

// Sort by age (ascending - default)
const sortedByAge = sortByKey(users, "age");
console.log(sortedByAge);
// Output: [{ name: 'Alice', age: 25, score: 92 }, { name: 'John', age: 30, score: 85 }, { name: 'Bob', age: 35, score: 78 }]

// Sort by score (descending)
const sortedByScore = sortByKey(users, "score", "desc");
console.log(sortedByScore);
// Output: [{ name: 'Alice', age: 25, score: 92 }, { name: 'John', age: 30, score: 85 }, { name: 'Bob', age: 35, score: 78 }]

// Sort by name (ascending)
const sortedByName = sortByKey(users, "name");
console.log(sortedByName);
// Output: [{ name: 'Alice', age: 25, score: 92 }, { name: 'Bob', age: 35, score: 78 }, { name: 'John', age: 30, score: 85 }]
```

## API

### `sortByKey(array, key, order)`

Sorts an array of objects by the value of a specified key.

#### Parameters

- `array` (Array): Array of objects to sort
- `key` (string): Key to sort by
- `order` (string, optional): Sort order - `'asc'` for ascending (default) or `'desc'` for descending

#### Returns

- (Array): A new sorted array (original array is not modified)

#### Error Handling

The function throws errors for invalid inputs:

- If the first parameter is not an array
- If the key is not a string
- If the order is not 'asc' or 'desc'

#### Handling of Special Values

- `undefined` values are placed at the end of the sorted array
- `null` values are placed at the end of the sorted array
- The function works with numbers, strings, and other comparable types

## Examples

### Sorting Numbers

```javascript
const products = [
  { name: "Laptop", price: 999 },
  { name: "Phone", price: 599 },
  { name: "Tablet", price: 299 },
];

const cheapToExpensive = sortByKey(products, "price");
const expensiveToCheap = sortByKey(products, "price", "desc");
```

### Sorting Strings

```javascript
const books = [
  { title: "Zebra Adventures", author: "John Doe" },
  { title: "Apple Stories", author: "Jane Smith" },
  { title: "Mountain Tales", author: "Bob Johnson" },
];

const alphabeticalByTitle = sortByKey(books, "title");
const alphabeticalByAuthor = sortByKey(books, "author");
```

### Handling Missing Values

```javascript
const data = [
  { name: "John", age: 30 },
  { name: "Alice" }, // missing age
  { name: "Bob", age: 25 },
];

const sorted = sortByKey(data, "age");
// Objects with missing 'age' will be placed at the end
```

## Features

- ✅ Lightweight and fast
- ✅ No dependencies
- ✅ Supports both ascending and descending sort
- ✅ Handles edge cases (null, undefined values)
- ✅ Doesn't modify the original array
- ✅ Full error handling
- ✅ Works with Node.js 12+
- ✅ TypeScript-friendly

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.0

- Initial release
- Basic sorting functionality for arrays of objects
- Support for ascending and descending order
- Error handling for invalid inputs
