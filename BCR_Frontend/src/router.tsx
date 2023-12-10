import { ComponentType, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";

type Props = Record<string, unknown>; // Change this to match the props of your components
type ComponentWithProps = ComponentType<Props>;

// Higher-order component (HOC) with explicit types
const Loader = (Component: ComponentWithProps) => (props: Props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Products = Loader(
  lazy(() => import("src/content/applications/Products"))
);

// Components

const Cards = Loader(lazy(() => import("src/content/pages/Components/Details")));

const CreateForms = Loader(lazy(() => import("src/content/pages/Components/Forms/CreateForm")));

const UpdateForms = Loader(lazy(() => import("src/content/pages/Components/Forms/UpdateForm")));

const Login = Loader(
  lazy(() => import("src/content/pages/Components/Login"))
);
const Register = Loader(
  lazy(() => import("src/content/pages/Components/Register"))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="login" replace />,
  },
  {
    path: "management",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="products" replace />,
      },
      {
        path: "products",
        element: <Products />,
      }
    ],
  },
  {
    path: "/form",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "create-form",
        element: <CreateForms />,
      },
      {
        path: "update-form/:car_id",
        element: <UpdateForms />,
      },
    ],
  },
  {
    path: "detail",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: ":car_id",
        element: (
          <PrivateProvider>
            <Cards />
          </PrivateProvider>
        ),
      }
    ],
  },
  {
    path: "login",
    element: (
      <PublicProvider>
        <Login />
      </PublicProvider>
    ),
  },
  {
    path: "register",
    element: (
      <PublicProvider>
        <Register />
      </PublicProvider>
    ),
  },
];

export default routes;
