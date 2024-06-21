import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SearchDomainOrTLD from "./pages/SearchDomainOrTLD";
import RegisterTLD from "./pages/RegisterTLD";
import RegisterDomain from "./pages/RegisterDomain";
import HomeLayout from "./layouts/HomeLayout";
import MainLayout from "./layouts/MainLayout";
import UserProfile from "./pages/UserProfile";
import NameServices from "./pages/NameServices";
import SingleDomain from "./pages/SingleDomain";
import SingleTLD from "./pages/SingleTLD";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "search",
        element: <SearchDomainOrTLD />,
      },
      {
        path: "register/tld",
        element: <RegisterTLD />,
      },
      {
        path: "register/domain",
        element: <RegisterDomain />,
      },
      {
        path: "user",
        children: [
          {
            path: ":address",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "name-services",
        element: <NameServices />,
      },
      {
        path: "domain",
        children: [
          {
            path: ":domain",
            element: <SingleDomain />,
          },
        ],
      },
      {
        path: "tld",
        children: [
          {
            path: ":tld",
            element: <SingleTLD />,
          },
        ],
      },
    ],
  },
]);

export default router;
