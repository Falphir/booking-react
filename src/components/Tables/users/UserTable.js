import './UserTable.css';
import React, { useState, useEffect } from 'react';
import Config from '../../../config';
import { Pagination, Table, Space } from 'antd';

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
                <label>
                    Name: {role.name}
                </label>
            )
        })
    }
    


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },

        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password'
        },

        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: renderRoles,
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            )
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

        <Table
            columns={columns}
            rowKey={record => record._id}
            dataSource={users}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}

        />
    )
}

export default UserTable;