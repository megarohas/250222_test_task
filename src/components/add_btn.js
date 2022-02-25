import React from "react";

import { sendRequest } from "../helpers/request";

const AddBtn = ({ onClickAction }) => {
  return (
    <button
      onClick={() => {
        sendRequest({
          type: "POST",
          mode: "no-cors",
          callback: () => {
            onClickAction();
          },
          url: "https://api.interview.flowmapp.com/tasks",
        });
      }}
    >
      Add One More Task
    </button>
  );
};

export default AddBtn;
