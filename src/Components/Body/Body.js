import React, { useState, useEffect } from "react";

function Body(props) {
  return (
    <div id="main">
      <div id="underConstruction">
        <h3>Thank you for visiting Manage My Project by Viral Bhavsar</h3>
        <h5>This site is currently under construction</h5>
        <h5>Tech Stacks used</h5>
        Front End
        <ul>
          <li>React</li>
          <li>Axios</li>
        </ul>
        Back End
        <ul>
          <li>Express</li>
          <li>PostgreSQL</li>
          <li>Heroku</li>
        </ul>
      </div>
      <h5>
        This site is using contineous deployment, more features are scheduled to
        be added soon.
      </h5>
    </div>
  );
}

export { Body };
