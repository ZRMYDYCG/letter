import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';

import { BiBug } from 'react-icons/bi';

import { useUserStore } from '@/stores';
import logo from '@/images/logo/logo.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const store = useUserStore();

  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // 导航项样式
  const sidebarItemSty =
    'group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4';
  // 导航选中样式
  const sidebarItemActiveSty = 'bg-graydark dark:bg-meta-4';

  const Arrow = ({ open }: { open: boolean }) => {
    return (
      <svg
        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
          open && 'rotate-180'
        }`}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
          fill=""
        />
      </svg>
    );
  };

  // 路由列表
  const routesAll = [
    {
      list: [
        {
          to: '/dashboard',
          path: 'dashboard',
          icon: <BiBug className="text-[22px]" />,
          name: '主控台',
        },
      ],
    },
    {
      group: '公告',
      list: [
        {
          to: '/iter',
          path: 'iter',
          icon: <BiBug className="text-[22px]" />,
          name: '更新日志',
        },
        {
          to: '/notice',
          path: 'notice',
          icon: <BiBug className="text-[22px]" />,
          name: '我的通知',
        },
      ],
    },
    {
      group: '系统管理',
      list: [
        {
          to: '/user',
          path: 'user',
          icon: <BiBug className="text-[22px]" />,
          name: '用户管理',
        },
        {
          to: '/role',
          path: 'role',
          icon: <BiBug className="text-[22px]" />,
          name: '角色管理',
        },
        {
          to: '/permission',
          path: 'permission',
          icon: <BiBug className="text-[22px]" />,
          name: '权限管理',
        },
        {
          to: '/menu',
          path: 'menu',
          icon: <BiBug className="text-[22px]" />,
          name: '菜单管理',
        },
        {
          to: '#',
          path: 'write',
          icon: <BiBug className="text-[22px]" />,
          name: '通知',
          subMenu: [
            {
              to: '/create',
              path: 'create',
              name: '发布通知',
            },
            {
              to: '/create_record',
              path: 'create_record',
              name: '历史通知',
            },
            {
              to: '/draft',
              path: 'draft',
              name: '草稿箱',
            },
            {
              to: '/recycle',
              path: 'recycle',
              name: '回收站',
            },
          ],
        },
      ],
    },
    {
      group: '内容管理',
      list: [
        {
          to: '#',
          path: 'tag',
          icon: <BiBug className="text-[22px]" />,
          name: '标签管理',
          subMenu: [
            {
              to: '/text',
              path: 'text',
              name: '文本标签',
            },
            {
              to: '/photo',
              path: 'photo',
              name: '照片标签',
            },
            {
              to: '/video',
              path: 'video',
              name: '视频标签',
            },
            {
              to: '/audio',
              path: 'audio',
              name: '音频标签',
            },
          ],
        },
        {
          to: '/messages',
          path: 'messages',
          icon: <BiBug className="text-[22px]" />,
          name: '留言管理',
          subMenu: [
            {
              to: '/text',
              path: 'text',
              name: '文本留言',
            },
            {
              to: '/photo',
              path: 'photo',
              name: '照片留言',
            },
            {
              to: '/video',
              path: 'video',
              name: '视频留言',
            },
            {
              to: '/audio',
              path: 'audio',
              name: '音频留言',
            },
          ],
        },
      ],
    },
    {
      group: '个人中心',
      list: [
        {
          to: '/profile',
          path: 'profile',
          icon: <BiBug className="text-[22px]" />,
          name: '个人资料',
        },
        {
          to: '/setting',
          path: 'setting',
          icon: <BiBug className="text-[22px]" />,
          name: '隐私设置',
        },
      ],
    },
  ];

  const [routes, setRoutes] = useState<typeof routesAll>([]);

  const getRouteList = () => {
    setRoutes(routesAll);
  };

  useEffect(() => {
    getRouteList();
  }, [store]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex justify-center items-center gap-2 px-6 py-5.5 pb-2 lg:pt-6">
        <NavLink
          to="/"
          className="flex items-center text-                     white"
        >
          <img src={logo} alt="logo" className="w-8 mr-2.5" />
          <div>Letter 后台管理系统</div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        />
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-4 lg:px-6">
          {routes.map((group, index) => (
            <div key={index}>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                {group.group}
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {group.list.map((item: any, subIndex) =>
                  item.subMenu ? (
                    <SidebarLinkGroup key={subIndex} activeCondition={false}>
                      {(handleClick, open) => (
                        <React.Fragment>
                          <NavLink
                            to={item.to}
                            className={`${sidebarItemSty}`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            {item.icon}
                            {item.name}
                            <Arrow open={open} />
                          </NavLink>

                          <div
                            className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {item.subMenu.map(
                                (subItem: any, subSubIndex: any) => (
                                  <li key={subSubIndex}>
                                    <NavLink
                                      to={subItem.to}
                                      className={({ isActive }) =>
                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                        (isActive && '!text-white')
                                      }
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </React.Fragment>
                      )}
                    </SidebarLinkGroup>
                  ) : (
                    <li key={subIndex}>
                      <NavLink
                        to={item.to}
                        className={`${sidebarItemSty} ${pathname.includes(item.path) && sidebarItemActiveSty}`}
                      >
                        {item.icon}
                        {item.name}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
