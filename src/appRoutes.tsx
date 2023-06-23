import React from 'react';
import { Routes,  Route } from 'react-router-dom';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<div>1</div>} />
        <Route path="/about" element={<div>2</div>} />
    </Routes>
  );
};

export default AppRoutes;