import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, StatisticProps, Empty, Table, Tag, Space } from 'antd';
import CountUp from 'react-countup';
import { SiGooglemessages } from "react-icons/si";
import { FcFeedback } from "react-icons/fc";
import { GrTag } from "react-icons/gr";
import { IoColorPaletteOutline } from "react-icons/io5";
import * as echarts from 'echarts';
import { PiNotificationFill } from "react-icons/pi";
import type { TableProps } from 'antd';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} />
);

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
            );
          })}
        </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Dashboard = () => {
  const [tableWidth, setTableWidth] = useState<number>(800); // 默认宽度
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    const chartDom = document.getElementById('annualMessagesChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      setChartInstance(myChart);

      const option = {
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '留言数',
          type: 'bar',
          data: [5, 20, 36, 10, 15, 40, 30, 20, 25, 15, 10, 5]
        }]
      };

      myChart.setOption(option);

      // 动态设置表格宽度
      const handleResize = () => {
        const width = window.innerWidth < 768 ? 600 : 800; // 移动端宽度设置为 600，PC 端为 800
        setTableWidth(width);

        // 重新调整图表尺寸
        if (myChart) {
          myChart.resize();
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // 初始化时调用

      return () => {
        myChart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
      <div style={{ padding: '20px' }}>
        <Row gutter={16}>
          <Col xs={24} sm={16} md={16} className="mb-[15px]">
            <Card title="网站数据">
              <div className="flex h-full w-full gap-4 justify-between">
                <Statistic valueStyle={{ textAlign: 'center' }} title="访问总数（次）" value={84} formatter={formatter} />
                <Statistic valueStyle={{ textAlign: 'center' }} title="用户总数（个）" value={7} formatter={formatter} />
                <Statistic valueStyle={{ textAlign: 'center' }} title="留言总数（条）" value={71} formatter={formatter} />
                <Statistic valueStyle={{ textAlign: 'center' }} title="留言墙（条）" value={27} formatter={formatter} />
                <Statistic valueStyle={{ textAlign: 'center' }} title="照片墙（条）" value={44} formatter={formatter} />
                <Statistic valueStyle={{ textAlign: 'center' }} title="视频墙（条）" value={44} formatter={formatter} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} className="mb-[15px]">
            <Card title="快捷入口">
              <div className="flex h-full w-full gap-4 justify-between text-nowrap">
                <div className="flex items-center flex-col">
                  <SiGooglemessages size={40}/>
                  <p>留言列表</p>
                </div>
                <div className="flex items-center flex-col">
                  <FcFeedback size={40}/>
                  <p>反馈管理</p>
                </div>
                <div className="flex items-center flex-col">
                  <GrTag size={40}/>
                  <p>标签管理</p>
                </div>
                <div className="flex items-center flex-col">
                  <IoColorPaletteOutline size={40}/>
                  <p>颜色管理</p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={16} md={16} className="mb-[15px]">
            <Card title="年度留言统计">
              <div id="annualMessagesChart" style={{ width: '100%', height: '400px' }}></div>
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} className="mb-[15px]">
            <Card
                title="网站公告"
                extra={
                  <div className="flex items-center justify-center">
                    <div className="mr-2">发布公告</div>
                    <PiNotificationFill />
                  </div>
                }
            >
              <Empty />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} className="mb-[15px]">
            <Card title="近期举报数据">
              <Table<DataType>
                  columns={columns}
                  dataSource={data}
                  scroll={{ x: tableWidth }} // 设置横向滚动
              />
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default Dashboard;

