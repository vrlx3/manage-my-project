import React, { useState, useEffect } from "react";
import { addActivity } from "../../utils";

function Activity(props) {
  const { master, useMaster } = props;

  return (
    <div id="addActivity">
      <input
        type="text"
        placeholder="Enter Activity or Task"
        value={master.addActivity}
        onChange={(ev) => {
          useMaster({ ...master, addActivity: ev.target.value });
        }}
      ></input>
      <button
        onClick={(ev) => {
          addActivity(master.addActivity);
        }}
      >
        Add Activity
      </button>
    </div>
  );
}

export { Activity };
