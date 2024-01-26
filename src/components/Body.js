
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Browse from './Browse'
import Login from './Login'
import WatchMovie from './WatchMovie'

const Body = () => {

  const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/browse",
        element: <Browse />
    },  
    {
        path: "/movie/:movieId",
        element: <WatchMovie />
    }
  ])

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body