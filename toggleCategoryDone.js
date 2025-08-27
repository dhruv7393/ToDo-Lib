const updateCategoryPriority = require("./updateCategoryPriority");
const sortToDos = require("./sortData");

/**
 * Toggles the done status of a category and all its tasks.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to toggle.
 * @param {boolean} [status] - Optional. The new done status. If not provided, auto-determines based on current task states.
 * @returns {Array} - The updated array of categories.
 */
const toggleCategoryDone = (data, _id, status) => {
  // Clone data to avoid mutation
  let dataCopy = JSON.parse(JSON.stringify(data));

  // Find the category
  const categoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return dataCopy;

  const category = dataCopy[categoryIdx];
  const currentIsMarkedDone = category.isMarkedDone;
  let newIsMarkedDone;

  // Determine the new status
  if (status === undefined) {
    // Auto-determine based on current task states
    const allTasksDone = category.tasks.every((task) => task.done);
    const allTasksNotDone = category.tasks.every((task) => !task.done);

    if (allTasksDone) {
      newIsMarkedDone = true;
    } else if (allTasksNotDone) {
      newIsMarkedDone = false;
    } else {
      // Mixed state - default to marking all as not done
      newIsMarkedDone = false;
    }
  } else {
    newIsMarkedDone = status;
  }

  // Update all tasks in the category only if status changes
  if (currentIsMarkedDone !== newIsMarkedDone) {
    for (const task of category.tasks) {
      if (task.done !== newIsMarkedDone) {
        task.done = newIsMarkedDone;
      }
    }

    // Update category counters
    const doneTasks = category.tasks.filter((t) => t.done).length;
    const notDoneTasks = category.tasks.length - doneTasks;
    category.done = doneTasks;
    category.notDone = notDoneTasks;
  }

  // Update category's isMarkedDone status
  const updatedCategoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  dataCopy[updatedCategoryIdx].isMarkedDone = newIsMarkedDone;

  // Only update category priority if isMarkedDone status actually changed
  if (currentIsMarkedDone !== newIsMarkedDone) {
    let newPriority;

    if (newIsMarkedDone) {
      // Category marked done: move to end (length + 1)
      newPriority = dataCopy.length;
    } else {
      // Category marked not done: move to priority above categories marked done
      const doneCategories = dataCopy.filter(
        (cat) => cat.isMarkedDone && cat._id !== _id
      );
      if (doneCategories.length === 0) {
        // No done categories, set to highest priority among not done
        const notDoneCategories = dataCopy.filter(
          (cat) => !cat.isMarkedDone && cat._id !== _id
        );
        if (notDoneCategories.length === 0) {
          newPriority = 1;
        } else {
          const maxPriority = Math.max(
            ...notDoneCategories.map((cat) => cat.priority)
          );
          newPriority = maxPriority + 1;
        }
      } else {
        // Set priority to be just above the highest priority done category
        const minDonePriority = Math.min(
          ...doneCategories.map((cat) => cat.priority)
        );
        newPriority = minDonePriority;
      }
    }

    dataCopy = updateCategoryPriority(dataCopy, _id, newPriority);
  }

  return sortToDos(dataCopy);
};

module.exports = toggleCategoryDone;
