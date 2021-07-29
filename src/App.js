import React, { useEffect, uesState, useState } from "react";

import { Header } from "./Components/Header/Header";
import { Body } from "./Components/Body/Body";
import { Footer } from "./Components/Footer/Footer";
import { Auth } from "./Components/AuthForm/Auth";

function App() {
  const [master, useMaster] = useState({});

  return (
    <div id="app">
      <Header master={master} useMaster={useMaster} />
      <Auth master={master} useMaster={useMaster} />
      <Body master={master} useMaster={useMaster} />
      <Footer master={master} useMaster={useMaster} />
    </div>
  );
}

export { App };
