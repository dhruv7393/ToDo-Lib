const toggleCategoryDone = require("./toggleCategoryDone");
const updateTaskPriority = require("./updateTaskPriority");
const sortToDos = require("./sortData");

/**
 * Adds a task to a particular category.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to add the task to.
 * @param {Object} taskDetails - The task object containing task details.
 * @returns {Array} - The updated array of categories.
 */
function addTask(data, _id, taskDetails) {
  // Create a deep copy of data to avoid mutation
  const dataCopy = JSON.parse(JSON.stringify(data));

  // Find the category by _id
  const categoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return sortToDos(dataCopy);

  const category = dataCopy[categoryIdx];

  // Create new task object with done initialized as false
  const newTask = {
    notes: "",
    canBeRepeated: false,
    ...taskDetails,
    done: false,
  };

  // Set priority below notDone tasks in category
  const notDoneTasks = category.tasks.filter((task) => !task.done);
  let targetPriority;

  if (notDoneTasks.length === 0) {
    targetPriority = 1;
  } else {
    const maxNotDonePriority = Math.max(
      ...notDoneTasks.map((task) => task.priority)
    );
    targetPriority = maxNotDonePriority + 1;
  }

  // Add task at very end with temporary priority
  newTask.priority = category.tasks.length + 1;
  category.tasks.push(newTask);

  // Update priority of done tasks first
  let updatedData = dataCopy;
  const doneTasks = category.tasks.filter(
    (task) => task.done && task.name !== newTask.name
  );
  for (const doneTask of doneTasks) {
    const newDoneTaskPriority = doneTask.priority + 1;
    updatedData = updateTaskPriority(
      updatedData,
      _id,
      doneTask.name,
      newDoneTaskPriority
    );
  }

  // Use updateTaskPriority to move new task to correct position (notDone + 1)
  updatedData = updateTaskPriority(
    updatedData,
    _id,
    newTask.name,
    targetPriority
  );

  // Add 1 to notDone and total of current category
  const updatedCategory = updatedData.find((cat) => cat._id === _id);
  updatedCategory.notDone += 1;
  updatedCategory.total += 1;

  // Use toggleCategoryDone
  const finalData = toggleCategoryDone(updatedData, _id);

  // Finally use sortToDos to return the data
  return sortToDos(finalData);
}

module.exports = addTask;
