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
  const renderInput = () => {
    return (
      <div style={{ width: "200px", marginLeft: "5px" }}>
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
            let updated_task = { ...task, text: e.target.value };
            updateLocalTask(updated_task);
          }}
        />
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <div style={{ width: "200px", marginLeft: "5px" }}>
        <Select
          style={{ width: "100px" }}
          value={
            task.done > 0
              ? { value: 1, label: "Done" }
              : { value: 0, label: "To Do" }
          }
          onChange={(selectedOption) => {
            let updated_task = { ...task, done: selectedOption.value };
            updateLocalTask(updated_task);
          }}
          options={[
            { value: 0, label: "To Do" },
            { value: 1, label: "Done" },
          ]}
        />
      </div>
    );
  };

  const renderRemoveBtn = () => {
    return <RemoveBtn onClickAction={removeCallback} id={task.id} />;
  };

  const renderSaveChangesBtn = () => {
    return (
      is_included_to_unsaved_tasks && (
        <SaveChangesBtn task={task} onClickAction={saveChangesCallback} />
      )
    );
  };

  return (
    <div
      key={`${task.id}`}
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
        <div
          style={{ display: "flex", marginBottom: "3px", alignItems: "center" }}
        >
          {`Task ID: ${task.id}`}
        </div>
        <div
          style={{ display: "flex", marginBottom: "3px", alignItems: "center" }}
        >
          {`Task Text:`} {renderInput()}
        </div>
        <div
          style={{ display: "flex", marginBottom: "3px", alignItems: "center" }}
        >
          {`Task Status:`} {renderSelect()}
        </div>
      </div>
      <div>
        {renderRemoveBtn()}
        {renderSaveChangesBtn()}
      </div>
    </div>
  );
};

export default Task;
