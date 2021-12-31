import { Pagination, Table, Modal, Button, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import './ReserveTable.css';
import Config from '../../../config';

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
            pageSize: 10,
            total: 0
        }
    });


    const columns = [
        {
            title: 'Date Check In',
            dataIndex: 'dateCheckIn',
        },
        {
            title: 'Date Check Out',
            dataIndex: 'dateCheckOut',
        },
        {
            title: 'Name User',
            dataIndex: 'nameUser',
        },
        {
            title: 'ID Rooms',
            dataIndex: 'idRoom',
        },
        {
            title: 'Actions',
            render: (record) => {
                return <>
                    <EditOutlined />
                    <DeleteOutlined onClick={() => { onDeleteReserve(record) }} style={{ color: "red", marginLeft: 12 }} />
                </>
            }
        }
    ];


    const onDeleteReserve = (record) => {

        Modal.confirm({
            title: 'Are you sure, you want to delete this reserve record?',
            onOk: () => {
                setData((pre) => {
                    return pre.filter((reserve) => reserve._id !== record._id);
                    //pre.filter((rooms.map((room) => { return room._id }) !== record._id))
                });
            },
        });
    };


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
        <div>
            <Row justify="end">
                <Col>
                    <div style={{ margin: 8 }}>
                        <Button loading={loading}>
                            <PlusOutlined style={{ marginRight: 8 }} /> Add Reserve
                        </Button>
                    </div>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={reserves}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default ReserveTable;