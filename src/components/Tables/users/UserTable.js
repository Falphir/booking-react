import './UserTable.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Tag, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const UserTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [hidden, setHidden] = useState(true)
    const [icon, setIcon] = useState(true)
    const [data, setData] = useState({
        users: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });

    const renderRole = (role) => {
        console.log(role)
        let color = 'geekblue';
        if (role.nameRole === 'admin') {
            color = 'green'
        } else if (role.nameRole === 'editor') {
            color = 'red'
        }
        return (
            <Tag color={color}>{role.nameRole}</Tag>
        )
    }

    //Renderizar Scopes
    const renderScopes = (role) => {
        console.log(role)
        return role.scopes.map((scope) => {
            return (
                <label key={scope._id} >
                    <Tag color="blue">{scope}</Tag>
                </label >
            )
        })
    }



    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            hidden: hidden,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            defaultSortOrder: 'ascend',
        },

        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'Role',
            dataIndex: 'role',
            filters: [
                {
                    text: 'Admin',
                    value: 'admin',
                },
                {
                    text: 'Editor',
                    value: 'editor',
                },
                {
                    text: 'User',
                    value: 'user',
                }
            ],
            onFilter: (value, record) => record.role.nameRole.indexOf(value) === 0,
            sorter: (a, b) => a.role.nameRole.localeCompare(b.role.nameRole),
            render: renderRole
        },
        {
            title: 'Scopes',
            dataIndex: 'role',
            render: renderScopes,
        },
        {
            title: 'Actions',
            render: (record) => {
                return <>
                    {icon &&
                        <EyeOutlined onClick={() => { onUnlockId() }}/>
                    }
                    {!icon &&
                        <EyeInvisibleOutlined onClick={() => { onUnlockId() }} />
                    }

                    <DeleteOutlined onClick={() => { onDeleteUser(record) }} style={{ color: "red", marginLeft: 12 }} />
                </>
            }
        }
    ].filter(item => !item.hidden);;

    const onDeleteUser = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this user?',
            onOk: () => {
                fetch(`/auth/admin/users/${record._id}`, {
                    method: 'DELETE',
                })
                window.location.reload(false)
            },
        });
    };

    const onUnlockId = () => {
        setHidden(!hidden)
        setIcon(!icon)
    }


    const fetchApi = (pageSize, current) => {
        const url = '/auth/admin/users?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json' }
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
                    <Link to='/admin/register'>
                        <Button loading={loading} style={{ marginBottom: 8 }}>
                            <PlusOutlined style={{ marginRight: 8 }} /> Add User
                        </Button>
                    </Link>
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