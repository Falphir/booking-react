import './UserTable.css';
import { useState, useEffect } from 'react';
import Config from '../../../config';
import { Table, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

    /* const renderRole = (role) => {
        return role.map((roles) => {
            return (
                <label key={roles._id}>
                    a
                </label>
            )
        })
    } */

    /* const renderScopes = (scopes) => {
        return scopes.map((scope) => {
            return (
                <label key={scope._id}>
                    {scope.scopes}
                </label>
            )
        })
    } */


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },

        {
            title: 'Email',
            dataIndex: 'email',
        }/* ,

        {
            title: 'Password',
            dataIndex: 'password',
        } *//* ,

        {
            title: 'Role',
            dataIndex: 'role',
            render: renderRole
        } */
    ];


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