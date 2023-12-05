import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";
import ErrorPage from "./pages/ErrorPage";
import LogInPage from "./pages/LoginPage";
import RoutePrivate from "./components/RoutePrivate";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./pages/RegisterPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppMain />,
    children: [
      {
        path: '',
        element: /*<RoutePrivate>*/<Outlet />/*</RoutePrivate>*/,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'juegos',
            element: /*<RoutePrivate>*/<Outlet />/*</RoutePrivate>*/,
            children: [
              {
                path: '',
                element: <GamesPage />
              },
              {
                path: ':id',
                element: <GamePage />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/iniciar-sesion",
    element: <LogInPage />
  },
  {
    path: "/registro",
    element: <RegisterPage />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

function AppMain() {
  return (
    <>
      <Nav />
      <main className="container my-5">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App;