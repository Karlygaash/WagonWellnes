import './App.css';
import SideBar from './components/SideBar';
import Information from './page/Information';
import Main from './page/Main';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router=createBrowserRouter([
    {
      	path: "*",
      	element: <h1>404 ERROR</h1>
    },
    {
      element: <SideBar/>,
      children: [
        {
          path: "/",
          element: <Main/>,
        },
      {
        path: "/information",
        element: <Information/>,
      },
      {
        path: "/statistic",
        element: <Information/>
      }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
