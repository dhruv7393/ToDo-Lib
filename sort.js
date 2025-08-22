/**
 * Sorts an array of objects by the value of a specified key
 * @param {Array} array - Array of objects to sort
 * @param {string} key - Key to sort by
 * @param {string} order - Sort order: 'asc' for ascending, 'desc' for descending (default: 'asc')
 * @returns {Array} - Sorted array
 */
function sortByKey(array, key, order = "asc") {
  if (!Array.isArray(array)) {
    throw new Error("First parameter must be an array");
  }

  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }

  if (order !== "asc" && order !== "desc") {
    throw new Error('Order must be either "asc" or "desc"');
  }

  return array.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    // Handle undefined values - put them at the end
    if (valueA === undefined && valueB === undefined) return 0;
    if (valueA === undefined) return 1;
    if (valueB === undefined) return -1;

    // Handle null values - put them at the end
    if (valueA === null && valueB === null) return 0;
    if (valueA === null) return 1;
    if (valueB === null) return -1;

    // Compare values
    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

module.exports = sortByKey;
