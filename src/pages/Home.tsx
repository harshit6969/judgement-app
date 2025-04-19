import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;