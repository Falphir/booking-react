import './UserTable.css';
import { useState, useEffect } from 'react';
import Config from '../../../config';
import { Table, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const UserTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        users: [],
        pagination: {
            current: 1,
            pageSize: 3,
            total: 0
        }
    });

    const renderRoles = (roles) => {
        return roles.map((role) => {
            return (
                <label key={role._id}>
                    Name: {role.name}
                </label>
            )
        })
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },

        {
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Password',
            dataIndex: 'password',
        },

        {
            title: 'Role',
            dataIndex: 'role',
            render: renderRoles,
        },
    ];


    const fetchApi = (pageSize, current) => {
        const url = '/auth/admin/users?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, users = [], pagination } = response;


                if (auth) {
                    setLoading(false);
                    setData({
                        users,
                        pagination: {
                            current: pagination.page + 1 || 1,
                            pageSize: pagination.pageSize || 10,
                            total: pagination.total || 5
                        }
                    })
                }
            });
    }


    useEffect(() => {
        fetchApi(data.pagination.pageSize, data.pagination.current);

        return () => setData({
            users: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });
    }, []);


    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    };


    const { users, pagination } = data;


    return (
        <div>
            <Row justify="end">
                <Col>
                    <div style={{ margin: 8 }}>
                        <Button loading={loading}>
                            <PlusOutlined style={{ marginRight: 10 }} /> Add User
                        </Button>
                    </div>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={users}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}

            />
        </div>
    )
}

export default UserTable;