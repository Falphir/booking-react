import { Table } from 'antd';
import { useState, useEffect } from 'react';
import './ReserveTable.css';
import Config from '../config';

const ReserveTable = (props) => {

    let a = new Date(props.dateCheckIn);
    let dateCheckIn = a.toLocaleString();

    let b = new Date(props.dateCheckOut);
    let dateCheckOut = b.toLocaleString();

    const [loading, setLoading] = useState();
    const [data, setData] = useState({
        reserves: [],
        pagination: {
            current: 1,
            pageSize: 2,
            total: 0
        }
    });


    const columns = [
        {
            title: 'Date Check In',
            dataIndex: 'dateCheckIn',
            width: '20%,'
        },
        {
            title: 'Date Check Out',
            dataIndex: 'dateCheckOut',
            width: '20%,'
        },
        {
            title: 'Name User',
            dataIndex: 'nameUser',
            width: '20%,'
        },
        {
            title: 'ID Rooms',
            dataIndex: 'idRoom',
            width: '20%,'
        }
    ];


    const fetchApi = (pageSize, current) => {
        const url = '/reserve/reserves?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, reserves = [], pagination } = response;

                if (auth) {
                    setLoading(false);
                    setData({
                        reserves,
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
            reserves: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });

    }, []);


    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    };


    const { reserves, pagination } = data;

    return (
        <Table
            columns={columns}
            rowKey={record => record._id}
            dataSource={reserves}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default ReserveTable;