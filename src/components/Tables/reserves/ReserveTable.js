import { Table, Modal, Button, Row, Col } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import './ReserveTable.css';
import moment from 'moment';

const ReserveTable = (props) => {

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
            title: 'ID User',
            dataIndex: 'idUser',
        },
        {
            title: 'ID Room',
            dataIndex: 'idRoom',
        },
        {
            title: 'Date Check In',
            dataIndex: 'dateCheckIn',
            sorter: (a, b) => moment(a.dateCheckIn).unix() - moment(b.dateCheckIn).unix(),
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Date Check Out',
            dataIndex: 'dateCheckOut',
            sorter: (a, b) => moment(a.dateCheckOut).unix() - moment(b.dateCheckOut).unix(),
        },

        {
            title: 'Actions',
            fixed: 'right',
            width: '10%',
            render: (record) => {
                return <>
                <Row justify='center'>
                    <DeleteOutlined onClick={() => { onDeleteReserve(record) }} style={{ color: "red", marginLeft: 12 }} />
                    </Row>
                </>
            }
        }
    ];


    const onDeleteReserve = (record) => {

        Modal.confirm({
            title: 'Are you sure, you want to delete this Reserve?',
            onOk: () => {
                fetch(`/reserve/reserves/${record._id}`, {
                    method: 'DELETE',
                })
                reloadTable()
            },
        });
    };


    const fetchApi = (pageSize, current) => {
        const url = '/reserve/reserves?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json' }
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

    const reloadTable = () => {
        handleTableChange(pagination)
    }

    const { reserves, pagination } = data;

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Row justify="start">
                        <Col>
                            <Button onClick={reloadTable} style={{ marginBottom: 8 }}>
                                <ReloadOutlined />
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={reserves}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ x: 1000 }}
                sticky
            />
        </div>
    )
}

export default ReserveTable;