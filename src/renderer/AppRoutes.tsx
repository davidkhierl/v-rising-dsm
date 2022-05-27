import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from 'renderer/layout/Layout';
import Home from 'renderer/modules/Home';

const AppRoutes = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default AppRoutes;
