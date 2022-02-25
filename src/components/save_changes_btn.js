import React from "react";

import { sendRequest } from "../helpers/request";

const SaveChangesBtn = ({ task, onClickAction }) => {
  return (
    <button
      onClick={() => {
        sendRequest({
          type: "PUT",
          callback: () => {
            onClickAction();
          },
          url: `https://api.interview.flowmapp.com/tasks/${task.id}`,
          body: task,
        });
      }}
    >
      Save Changes
    </button>
  );
};

export default SaveChangesBtn;
