import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout';
import Home from '@/pages/home';
import Todos from '@/pages/todos';

// App component: Sets up the router and defines routes for the application
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Layout component wraps around the nested routes */}
          <Route index element={<Home />} />
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}