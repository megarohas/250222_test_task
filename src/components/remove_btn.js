import React from "react";

import { sendRequest } from "../helpers/request";

const RemoveBtn = ({ id, onClickAction }) => {
  return (
    <button
      onClick={() => {
        sendRequest({
          type: "DELETE",
          callback: () => {
            onClickAction(id);
          },
          url: `https://api.interview.flowmapp.com/tasks/${id}`,
        });
      }}
    >
      Remove Task
    </button>
  );
};

export default RemoveBtn;
