import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import UserTable from '../Tables/UserTable';

const { Content, Sider } = Layout;

function Dashboard() {
    return (
        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200} style={{ marginRight: '10px' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="1">Users</Menu.Item>
                            <Menu.Item key="2">Rooms</Menu.Item>
                            <Menu.Item key="3">Reserves</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className='content' style={{ padding: '12px 24px', minHeight: 280, background: '#fff' }}>
                        <UserTable/>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default Dashboard
