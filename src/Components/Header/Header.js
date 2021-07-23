import React, { useState, useEffect } from "react";
import "./header.css";

function Header(props) {
  const { master, uesMaster } = props;

  return (
    <div id="header">
      <div id="title">
        <h1>Manage My Project</h1>
      </div>
    </div>
  );
}

export { Header };
