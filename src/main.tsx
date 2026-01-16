import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen.ts'
import { RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({
  routeTree
});

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML)
{
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}