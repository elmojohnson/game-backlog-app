import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import NotFound from "./pages/not-found.page";
import SignIn from "./pages/auth/sign-in.page";
import SignUp from "./pages/auth/sign-up.page";
import Home from "./pages/home.page";
import Backlogs from "./pages/backlog/backlogs.page";
import ViewBacklog from "./pages/backlog/view-backlog.page";
import Account from "./pages/account.page";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route index element={<Home />} />
      <Route path="auth/sign-in" element={<SignIn />} />
      <Route path="auth/sign-up" element={<SignUp />} />
      <Route path="backlogs" element={<Backlogs />} />
      <Route path="backlogs/:id" element={<ViewBacklog />} />
      <Route path="account" element={<Account />} />
    </Routes>
  </BrowserRouter>
);
