import React, { useState, useEffect } from "react";

import { sendRequest } from "./helpers/request";
import AddBtn from "./components/add_btn";
import Task from "./components/task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [unsaved_tasks, setUnsavedTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    sendRequest({
      callback: (data) => {
        setTasks(data);
      },
      url: "https://api.interview.flowmapp.com/tasks",
    });
  };

  const updateLocalTask = (task) => {
    let updated_task = { ...task };
    let new_unsaved_tasks = unsaved_tasks;
    let new_tasks = [...tasks].map((old_task) => {
      if (old_task.id == updated_task.id) {
        new_unsaved_tasks.push(updated_task.id);
        return updated_task;
      } else return old_task;
    });

    setTasks([...new_tasks]);
    setUnsavedTasks([...new_unsaved_tasks]);
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <Task
        task={task}
        updateLocalTask={updateLocalTask}
        is_included_to_unsaved_tasks={unsaved_tasks.includes(task.id)}
        tasks={tasks}
        setTasks={setTasks}
        removeCallback={() => {
          let new_tasks = [...tasks].filter(
            (old_task) => old_task.id != task.id
          );
          setTasks([...new_tasks]);
          alert("Task was removed successfuly!");
        }}
        saveChangesCallback={(id) => {
          let new_unsaved_tasks = [...unsaved_tasks].filter(
            (unsaved_task_id) => unsaved_task_id != task.id
          );
          setUnsavedTasks([...new_unsaved_tasks]);
          alert("Task was saved successfuly!");
        }}
      />
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <AddBtn
        onClickAction={() => {
          let last_task =
            tasks.length > 0 ? tasks[tasks.length - 1] : { id: 0 };
          let new_task = {
            id: last_task.id + 1,
            text: "",
            done: null,
            sort: null,
          };
          let new_tasks = [...tasks];
          new_tasks.push(new_task);
          setTasks([...new_tasks]);
          alert("Task was added successfuly!");
        }}
      />
      <div>Tasks amount: {tasks.length}</div>
      {renderTasks()}
    </div>
  );
}

export default App;
