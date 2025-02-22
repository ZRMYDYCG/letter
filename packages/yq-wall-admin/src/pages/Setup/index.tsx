import { useState } from 'react';
import { Card } from 'antd';

import Title from '@/components/Title';

import { BiGlobe, BiLayout, BiShieldQuarter, BiUser } from 'react-icons/bi';

interface Setup {
  title: string;
  description: string;
  icon: React.ReactNode;
  key: string;
}

const SetupPage = () => {
  const [active, setActive] = useState('system');

  const iconSty = 'w-5 h-8 mr-1';
  const list: Setup[] = [
    {
      title: '系统设置',
      description: '配置管理员账号、登录时间等',
      icon: <BiShieldQuarter className={iconSty} />,
      key: 'system',
    },
    {
      title: '网站设置',
      description: '配置网站标题、LOGO、描述、SEO等',
      icon: <BiGlobe className={iconSty} />,
      key: 'web',
    },
    {
      title: '主题设置',
      description: '配置网站主题风格',
      icon: <BiLayout className={iconSty} />,
      key: 'layout',
    },
    {
      title: '个人设置',
      description: '配置个人信息等',
      icon: <BiUser className={iconSty} />,
      key: 'my',
    },
  ];

  return (
    <>
      <Title value="项目配置" />

      <Card className="mt-2 min-h-[calc(100vh-180px)]">
        <div className="flex flex-col md:flex-row">
          <ul className="w-full md:w-[20%] md:mr-5 mb-10 md:mb-0 border-b md:border-r border-[#eee] divide-y divide-solid divide-[#F6F6F6]">
            {list.map((item) => (
              <li
                key={item.key}
                className={`relative p-3 pl-5 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-[3.5px] before:h-[0%] before:bg-[#727cf5] cursor-pointer transition-all ${active === item.key ? 'bg-[transparent] before:h-full' : ''}`}
                onClick={() => setActive(item.key)}
              >
                <h3 className="flex items-center text-base">
                  {item.icon} {item.title}
                </h3>

                <p className="text-[13px] text-[#858585] text-gray-500 mt-1">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="w-full md:w-[80%] px-0 md:px-8"></div>
        </div>
      </Card>
    </>
  );
};

export default SetupPage;
