const getNumberOfCategoriesMarkedDone = (categories) => {
  return categories.filter((cat) => cat.isMarkedDone).length;
};

const getNumberOfCategoriesMarkedNotDone = (categories) => {
  return categories.filter((cat) => !cat.isMarkedDone).length;
};

const categoryStatusNeedsUpdate = (currentCategory) => {
  let allDoneTasks = currentCategory.tasks.filter((task) => task.done).length;
  let totalTasks = currentCategory.tasks.length;
  return currentCategory.isMarkedDone !== (allDoneTasks === totalTasks);
};

const taskStatusNeedsUpdate = (currentTask, newStatus) => {
  return currentTask.done !== newStatus;
};

const indexOfCategoryById = (data, _id) => {
  return data.findIndex((cat) => cat._id === _id);
};

const getCurrentCategory = (data, _id) => {
  return JSON.parse(JSON.stringify(data.find((cat) => cat._id === _id)));
};

const getCurrentTask = (category, name) => {
  return JSON.parse(
    JSON.stringify(category.tasks.find((task) => task.name === name))
  );
};

const toggleTaskDoneStatus = (category, name, status) => {
  const currentTask = getCurrentTask(category, name);
  let tasksFromPriority = JSON.parse(JSON.stringify(category.tasks));
  if (currentTask && taskStatusNeedsUpdate(currentTask, status)) {
    let currentTaskPriority = currentTask.priority;
    tasksFromPriority = tasksFromPriority.map((task) => {
      if (task.name === name) {
        task.done = status;
        task.priority = status
          ? tasksFromPriority.length
          : category.notDone + 1;
      } else if (task.priority >= currentTaskPriority && status) {
        task.priority -= 1; // Shift up tasks below
      } else if (
        task.priority > category.notDone &&
        task.priority < currentTaskPriority &&
        !status
      ) {
        task.priority += 1; // Shift up tasks below
      }
      return task;
    });
    return {
      ...category,
      done: category.done + (status ? 1 : -1),
      notDone: category.notDone - (status ? 1 : -1),
      tasks: tasksFromPriority,
    };
  }
  return category; // No change needed
};

const toggleCategoryDoneStatus = (
  data,
  category,
  status,
  toggleAlltask = false
) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let categoriesNotDone = getNumberOfCategoriesMarkedNotDone(data);
  let currentCategory = getCurrentCategory(dataCopy, category._id);
  if (currentCategory && currentCategory.isMarkedDone !== status) {
    let currentCategoryPriority = currentCategory.priority;
    dataCopy = dataCopy.map((cat) => {
      if (cat._id === category._id) {
        cat.isMarkedDone = status;
        cat.priority = status ? dataCopy.length : categoriesNotDone + 1;
        if (toggleAlltask) {
          cat.tasks = cat.tasks.map((task) => ({
            ...task,
            done: status,
          }));
          cat.done = status ? cat.tasks.length : 0;
          cat.notDone = status ? 0 : cat.tasks.length;
        }
      } else if (cat.priority >= currentCategoryPriority && status) {
        cat.priority -= 1; // Shift up categories below
      } else if (
        cat.priority > categoriesNotDone &&
        cat.priority < currentCategoryPriority &&
        !status
      ) {
        cat.priority += 1; // Shift up categories below
      }
      return cat;
    });
    return dataCopy;
  }
  return dataCopy; // No change needed
};

const deleteCategory = (data, _id) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let currentCategory = getCurrentCategory(dataCopy, _id);
  if (currentCategory) {
    const currentCategoryPriority = currentCategory.priority;
    dataCopy = dataCopy
      .filter((cat) => cat._id !== _id)
      .map((cat) => {
        if (cat.priority > currentCategoryPriority) {
          cat.priority -= 1; // Shift up categories below
        }
        return cat;
      });
    return dataCopy;
  }
  return dataCopy; // No change needed
};

const deleteTaskByName = (data, _id, name) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let currentCategory = getCurrentCategory(dataCopy, _id);
  let currentCategoryIndex = indexOfCategoryById(dataCopy, _id);
  if (currentCategory) {
    let currentTask = getCurrentTask(currentCategory, name);
    if (currentTask) {
      let currentTaskPriority = currentTask.priority;
      let listOfTasks = currentCategory.tasks
        .filter((task) => task.name !== name)
        .map((task) => {
          if (task.priority > currentTaskPriority) {
            task.priority -= 1; // Shift up categories below
          }
          return task;
        });
      currentCategory.tasks = listOfTasks;
      dataCopy[currentCategoryIndex] = {
        ...currentCategory,
        tasks: listOfTasks,
        done: currentCategory.done - (currentTask.done ? 1 : 0),
        notDone: currentCategory.notDone - (currentTask.done ? 0 : 1),
        total: listOfTasks.length,
      };
    }
    return dataCopy;
  }
  return dataCopy; // No change needed
};

const addNewCategory = (data, _id, name, color, border) => {
  let dataCopy = Array.isArray(data) ? JSON.parse(JSON.stringify(data)) : [];
  const numOfNotDoneCategories = getNumberOfCategoriesMarkedNotDone(dataCopy);
  const newCategory = {
    _id: _id,
    name: name ? name : "New Category",
    color: color ? color : "#FFFFFF",
    border: border ? border : "#FFFFFF",
    priority: numOfNotDoneCategories + 1,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: false,
    tasks: [],
  };
  dataCopy = dataCopy.map((cat) => {
    if (cat.priority >= numOfNotDoneCategories) {
      cat.priority += 1; // Shift down done categories
    }
    return cat;
  });

  dataCopy.push(newCategory);
  return dataCopy;
};

const addNewTask = (data, _id, taskDetails) => {
  const dataCopy = JSON.parse(JSON.stringify(data));
  const currentCategory = getCurrentCategory(dataCopy, _id);
  const currentCategoryIndex = indexOfCategoryById(dataCopy, _id);
  const newTask = {
    name: "New Task",
    notes: "",
    canBeRepeated: false,
    ...taskDetails,
    priority: category.tasks.length + 1,
    done: false,
  };
  currentCategory = reaarangeVaccation(
    currentCategory.tasks,
    newTask.priority,
    currentCategory.notDone + 1
  );
  currentCategory.notDone += 1;
  currentCategory.total += 1;
  currentCategory.tasks.push(newTask);
  dataCopy[currentCategoryIndex] = currentCategory;
  dataCopy = toggleCategoryDoneStatus(dataCopy, currentCategory, false);
  return dataCopy;
};

const reaarangeVaccation = (list, oldPriority, newPriority) => {
  let listCopy = JSON.parse(JSON.stringify(list));
  let origin = oldPriority;
  let destination = newPriority;
  if (origin < destination) {
    destination = destination <= list.length + 1 ? destination : list.length;
    listCopy = listCopy.map((item) => {
      if (item.priority === origin) {
        item.priority = destination;
      } else if (item.priority > origin && item.priority <= destination) {
        item.priority -= 1; // Shift up items between origin and destination
      }
      return item;
    });
    return listCopy;
  } else {
    destination = destination >= 1 ? destination : 1;
    listCopy = listCopy.map((item) => {
      if (item.priority === origin) {
        item.priority = destination;
      } else if (item.priority < origin && item.priority >= destination) {
        item.priority += 1; // Shift down items between destination and origin
      }
      return item;
    });
    return listCopy;
  }
  return listCopy;
};

module.exports = {
  getNumberOfCategoriesMarkedDone,
  getNumberOfCategoriesMarkedNotDone,
  categoryStatusNeedsUpdate,
  taskStatusNeedsUpdate,
  indexOfCategoryById,
  getCurrentCategory,
  getCurrentTask,
  toggleTaskDoneStatus,
  toggleCategoryDoneStatus,
  deleteCategory,
  deleteTaskByName,
  addNewCategory,
  addNewTask,
  reaarangeVaccation,
};
