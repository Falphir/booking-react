import './UserTable.css';
import { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Tag, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const UserTable = (props) => {

    const [loading, setLoading] = useState(true);
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

    //Renderizar Tags
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
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },

        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
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
                    <DeleteOutlined onClick={() => { onDeleteUser(record) }} style={{ color: "red", marginLeft: 12 }} />
                </>
            }
        }
    ];

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
                    <div style={{ margin: 8 }}>
                        <Link to='/admin/register'>
                            <Button loading={loading}>
                                <PlusOutlined style={{ marginRight: 8 }} /> Add User
                            </Button>
                        </Link>
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