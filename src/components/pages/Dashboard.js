import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Users from '../Tables/users/Users';
import Rooms from '../Tables/rooms/Rooms';
import Reserves from '../Tables/reserves/Reserves';
import {Link} from 'react-router-dom'


const { Content, Sider } = Layout;

function Dashboard() {

    const [menu, setMenu] = useState(1);

    return (
        <Layout>
            <Content style={{ padding: '0 30px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/dashboard">Dashboard</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background">
                    <Sider className="site-layout-background" width={150} style={{ marginRight: '10px' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['2']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="1" onClick={() => setMenu(1)}>Users</Menu.Item>
                            <Menu.Item key="2" onClick={() => setMenu(2)}>Rooms</Menu.Item>
                            <Menu.Item key="3" onClick={() => setMenu(3)}>Reserves</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className='content' style={{ minHeight: 280, background: '#fff' }}>
                        {(() => {
                            switch (menu) {
                                case 1: return <Users />;
                                case 2: return <Rooms />;
                                case 3: return <Reserves />;
                                default: return <Users />;
                            }
                        })()}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default Dashboard
