import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const sendRequest = (
    params = {
      type: "GET",
      callback: () => {},
      body: undefined,
      url: "",
      mode: "no-cors",
    }
  ) => {
    console.log("params", params);
    let config = {
      method: params.type,
      mode: params.mode,
      body: JSON.stringify(params.body),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    fetch(params.url, config)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        let result = {};
        console.log("response", response);
        try {
          result = JSON.parse(response);
        } catch (e) {
          result = {};
          console.log("it's not a json");
        } finally {
          return result;
        }
      })
      .then((data) => {
        console.log("data", data);
        params.callback(data);
      })
      .catch((e) => {
        console.log("help");
        console.log(e);
      });
  };

  const getTasks = () => {
    sendRequest({
      callback: (data) => {
        setTasks(data);
      },
      url: "https://api.interview.flowmapp.com/tasks",
      mode: "cors",
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const renderTask = (task) => {
    return (
      <div
        key={`${task.text}${task.id}`}
        style={{
          border: "1px solid black",
          padding: "0px 10px",
          margin: "0px 10px 5px 10px",
        }}
      >
        {task.text}
        {renderRemoveBtn(task.id)}
        {renderChangeBtn(task.id)}
      </div>
    );
  };

  const renderTasks = () => {
    return tasks.map((task) => renderTask(task));
  };

  const addOneMoreTask = () => {
    sendRequest({
      type: "POST",
      callback: () => {
        getTasks();
      },
      url: "https://api.interview.flowmapp.com/tasks",
    });
  };

  const renderAddBtn = () => {
    return (
      <button
        onClick={() => {
          addOneMoreTask();
        }}
      >
        Add One More Task
      </button>
    );
  };

  const removeTask = (id) => {
    sendRequest({
      type: "DELETE",
      callback: () => {
        getTasks();
      },
      url: `https://api.interview.flowmapp.com/tasks/${id}`,
    });
  };

  const changeTask = (id) => {
    sendRequest({
      type: "PUT",
      callback: () => {
        getTasks();
      },
      url: `https://api.interview.flowmapp.com/tasks/${id}`,
      body: { text: "blah", done: 0, sort: 0 },
    });
  };

  const renderRemoveBtn = (id) => {
    return (
      <button
        onClick={() => {
          removeTask(id);
        }}
      >
        Remove Task
      </button>
    );
  };
  const renderChangeBtn = (id) => {
    return (
      <button
        onClick={() => {
          changeTask(id);
        }}
      >
        Change Task
      </button>
    );
  };

  return (
    <div>
      {renderAddBtn()}
      <div>Tasks amount: {tasks.length}</div>
      {renderTasks()}
    </div>
  );
}

export default App;
