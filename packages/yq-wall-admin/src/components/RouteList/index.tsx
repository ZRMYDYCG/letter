import { useEffect, useState } from 'react';
import DefaultLayout from '@/layout/DefaultLayout';
import { Route, Routes, useLocation } from 'react-router-dom';

import Iterative from '@/pages/announcement/Iterative';
import Login from '@/pages/Login';
import Dashborad from '@/pages/dashboard';

import PageTitle from '../PageTitle';

import { useUserStore } from '@/stores';
import NotFound from '../NotFound';

export default () => {
  const store = useUserStore();
  const { pathname } = useLocation();
  const isLoginRoute = pathname === '/login';

  const routesAll = [
    { path: '/iter', title: '项目更新记录', component: <Iterative /> },
    { path: '/dashboard', title: '主控台', component: <Dashborad /> },
  ];

  const [routes, setRoutes] = useState<typeof routesAll | null>(null);

  const getRouteList = () => {
    setRoutes(routesAll);
  };

  useEffect(() => {
    getRouteList();
  }, [store]);

  useEffect(() => {}, [store, pathname]);

  if (isLoginRoute) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Letter | 通义知语" />
              <Login />
            </>
          }
        />
      </Routes>
    );
  }

  if (routes === null) return;

  return (
    <DefaultLayout>
      <Routes>
        {routes.map(({ path, title, component }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <PageTitle title={`Letter - ${title}`} />
                {component}
              </>
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </DefaultLayout>
  );
};
