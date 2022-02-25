import { DebounceInput } from "react-debounce-input";
import React from "react";
import Select from "react-select";

import RemoveBtn from "./remove_btn";
import SaveChangesBtn from "./save_changes_btn";

const Task = ({
  task,
  updateLocalTask,
  is_included_to_unsaved_tasks,
  removeCallback,
  saveChangesCallback,
}) => {
  return (
    <div
      key={`${task.text}${task.id}`}
      style={{
        border: "1px solid black",
        padding: "10px 10px",
        margin: "0px 0px 5px 0px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ marginBottom: "3px" }}>{`Task ID: ${task.id}`}</div>
        <div style={{ marginBottom: "3px" }}>
          {`Task Text:`}{" "}
          <DebounceInput
            minLength={2}
            debounceTimeout={500}
            placeholder={"Enter Task Text"}
            value={task.text || ""}
            style={{
              width: "500px",
              height: "30px",
              borderRadius: "4px",
              border: "1px solid rgb(204, 204, 204)",
              padding: "0px 10px",
            }}
            onChange={(e) => {
              let updated_task = {
                text: e.target.value,
                done: task.done,
                sort: task.sort,
                id: task.id,
              };

              updateLocalTask(updated_task);
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "3px" }}>
          {`Task Status:`}{" "}
          <div style={{ width: "200px", marginLeft: "5px" }}>
            <Select
              style={{ width: "100px" }}
              value={
                task.done > 0
                  ? { value: 1, label: "Done" }
                  : { value: 0, label: "To Do" }
              }
              onChange={(selectedOption) => {
                let updated_task = {
                  done: selectedOption.value,
                  text: task.text,
                  sort: task.sort,
                  id: task.id,
                };

                updateLocalTask(updated_task);
              }}
              options={[
                { value: 0, label: "To Do" },
                { value: 1, label: "Done" },
              ]}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          {task.id != 1 && (
            <RemoveBtn onClickAction={removeCallback} id={task.id} />
          )}
        </div>
        <div>
          {is_included_to_unsaved_tasks && (
            <SaveChangesBtn task={task} onClickAction={saveChangesCallback} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
