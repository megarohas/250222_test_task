import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const sendRequest = (
    params = {
      type: "GET",
      callback: () => {},
      body: undefined,
      url: "https://api.interview.flowmapp.com/tasks",
      mode: "cors",
    }
  ) => {
    let config = {
      method: params.type,
      mode: params.mode,
      body: JSON.stringify(params.body),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(params.url, config)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        let result = {};
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
        params.callback(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTasks = () => {
    sendRequest({
      callback: (data) => {
        setTasks(data);
      },
      url: "https://api.interview.flowmapp.com/tasks",
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
          margin: "0px 0px 5px 0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div>{`Task ID: ${task.id}`}</div>
          <div>{`Task Text: ${task.text || ""}`}</div>
          <div>{`Task Status: ${task.done > 0 ? "Done" : "In Progress"}`}</div>
        </div>
        <div>
          {task.id != 1 && renderRemoveBtn(task.id)}
          {task.id != 1 && renderChangeBtn(task.id)}
        </div>
      </div>
    );
  };

  const renderTasks = () => {
    return tasks.map((task) => renderTask(task));
  };

  const renderAddBtn = () => {
    return (
      <button
        onClick={() => {
          sendRequest({
            type: "POST",
            mode: "no-cors",
            callback: () => {
              getTasks();
            },
            url: "https://api.interview.flowmapp.com/tasks",
          });
        }}
      >
        Add One More Task
      </button>
    );
  };

  const renderRemoveBtn = (id) => {
    return (
      <button
        onClick={() => {
          sendRequest({
            type: "DELETE",
            callback: () => {
              getTasks();
            },
            url: `https://api.interview.flowmapp.com/tasks/${id}`,
          });
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
          sendRequest({
            type: "PUT",
            callback: () => {
              getTasks();
            },
            url: `https://api.interview.flowmapp.com/tasks/${id}`,
            body: { text: "blah", done: 1, sort: 0 },
          });
        }}
      >
        Change Task
      </button>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {renderAddBtn()}
      <div>Tasks amount: {tasks.length}</div>
      {renderTasks()}
    </div>
  );
}

export default App;
