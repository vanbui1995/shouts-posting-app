import React from "react";
import dayjs from "dayjs";
import { BrowserRouter } from "react-router-dom";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import LoginPage from "./pages/login-page";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import ChatBoard from "./components/modules/chat/chat-board";
import LeftSideBar from "./components/modules/layout/left-side-bar";
import RegisterPage from "./pages/register-page";

const Wrapper = (props: { children: any }) => {
  const { children } = props;
  const isMeteorInit = useSubscribe("user:currentUser");

  return isMeteorInit() ? null : children;
};

export const App = () => (
  <div className="h-[100vh] w-[100vw]">
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/app"
            element={
              <RequireAuth>
                <div className="flex h-full w-full bg-white">
                  <LeftSideBar />
                  <Outlet />
                </div>
              </RequireAuth>
            }
          >
            <Route path="/app" element={<ChatBoard />} />
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  </div>
);

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const currentUser = useTracker(() => Meteor.user(), []);

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
