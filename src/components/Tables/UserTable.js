import React, {useState, useEffect } from 'react';
import { Table } from 'antd';
import Config from '../../config'


const UserTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        players: [],
        pagination: {
            current: 1,
            pageSize: 2,
            total: 0
        }
    });


    const renderHobbies = (hobbies) => {
        return hobbies.map((hobbie) => {
            return (
                <label key={hobbie._id}>{ hobbie.name };</label>
            )
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            width: '20%',
        },
        {
            title: 'Hobbies',
            dataIndex: 'hobbies',
            render: renderHobbies,
        },
    ];

    const { players, pagination } = data;

    const fetchApi = (pageSize, current) => {
        const url = '/team/players?' + new URLSearchParams ({
            limit: pageSize,
            skip: current - 1
        })

        fetch(url, {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })
        .then((response) => response.json())
        .then((response) => {
            const { auth, players = [], 
                pagination } = response;

            if(auth) {
                setLoading(false);
                setData({
                    players,
                    pagination: {
                        current: pagination.page + 1 || 1,
                        pageSize: pagination.pageSize || 10,
                        total: pagination.total || 5
                    }
                })
            }
        })
    }

    useEffect(()=> {
        fetchApi(data.pagination.pageSize, data.pagination.current);

        return () => setData ({
            players: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });
    }, {});

    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    }

    return (
        <Table
            columns={columns}
            rowKey={record => record._id}
            dataSource={players}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default UserTable
