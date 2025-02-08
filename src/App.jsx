import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AdminPage, ErrorPage, HomePage } from './pages';
import { ROUTES } from './utils';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={ROUTES.HOME} element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path={ROUTES.ADMIN} element={<AdminPage/>} />
        <Route path={ROUTES.ERROR} element={<ErrorPage/>} />
      </Route>
    )
  )

  return (<RouterProvider router={router}/>)
}

export default App
