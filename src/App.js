import React, { useEffect } from "react";
import { Router, navigate } from "@reach/router";

import { ProvideNotion } from "./services/notion";
import { Devices } from "./pages/Devices";
import { Loading } from "./components/Loading";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";
import { Muse } from "./pages/Muse";

import { useNotion } from "./services/notion";
import { MuseClient, channelNames} from "muse-js";

window.museClient = new MuseClient()
window.channelNames = channelNames

export function App() {

  return (
    <ProvideNotion>
      <Routes />
    </ProvideNotion>
  );
}

function Routes() {
  const { user, loadingUser } = useNotion();

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/muse");
    }
  }, [user, loadingUser]);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <Router>
      <Calm path="/" />
      <Devices path="/devices" />
      <Login path="/login" />
      <Muse path="/muse" />
      <Logout path="/logout" />
    </Router>
  );
}
