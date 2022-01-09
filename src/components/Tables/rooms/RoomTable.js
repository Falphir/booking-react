import './RoomTable.css';
import React, { useState, useEffect } from 'react';
import Config from '../../../config';
import { Table, Modal, Tag, Button, Row, Col } from 'antd';
import { SelectOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RoomsForm from './add/RoomsForm';
import { Link } from 'react-router-dom';

const RoomTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        rooms: [],
        pagination: {
            current: 1,
            pageSize: 20,
            total: 0
        }
    });

    //Renderizar Imagem
    const renderImage = (text, record) => {
        return (
            <Link to={`/rooms/${record._id}`}>
                <img src={record.image} alt="Room Image" style={{ width: 150, height: 75 }} />
            </Link>
        );
    }

    //Renderizar Imagem
    const renderFacilities = (text, record) => {
        console.log("facilities: " + record)
        return (
            <label key={record._id}>
                <Tag color="blue">Type Room: {record.typeRoom} </Tag>
                <Tag color="blue">Nº Stars: {record.nStars}</Tag>
                <Tag color="blue">Nº Single Bed: {record.nSingleBed}</Tag>
                <Tag color="blue">Nº Double Bed: {record.nDoubleBed}</Tag>
            </label>
        );
    }


    //Renderizar Extras
    const renderExtras = (extras) => {
        console.log(extras)
        return extras.map((extra) => {
            return (
                <label key={extra._id} >
                    <Tag color="blue">{extra}</Tag>
                </label >
            )
        })
    }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            render: renderImage
        },
        // render: () => <img src={`image`} style={{width: 100}, {height: 50}}/>
        // <img src="images/room2.jpg" style={{width: 100}, {height: 50}}/>
        {
            title: 'Description',
            dataIndex: 'description',
        },

        {
            title: 'Nº Adults',
            dataIndex: 'nAdult',
        },

        {
            title: 'Nº Children',
            dataIndex: 'nChild',
        },

        {
            title: 'Nº Rooms',
            dataIndex: 'nRoom',
        },

        {
            title: 'Price (€)',
            dataIndex: 'price',
        },

        {
            title: 'Facilities',
            dataIndex: 'facilities',
            render: renderFacilities,

        },
        {
            title: 'Extras',
            dataIndex: 'extras',
            render: renderExtras,
        },
        {
            title: 'Actions',
            render: (record) => {
                return <>
                    <SelectOutlined onClick={() => { onViewRoom(record) }} style={{ color: "blue" }} />
                    <EditOutlined onClick={() => { onEditRoom(record) }} style={{ marginLeft: 12 }} />
                    <DeleteOutlined onClick={() => { onDeleteRoom(record) }} style={{ color: "red", marginLeft: 12 }} />
                </>
            }
        }

    ];

    const onViewRoom = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to see this room?',
            onOk: () => {
                <Link to={`/rooms/${record._id}`}></Link>
            },
        });
    };

    const onDeleteRoom = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this room?',
            onOk: () => {
                fetch(`/hotel/rooms/${record._id}`, {
                    method: 'DELETE',
                })
                window.location.reload(false)
            },
        });
    };

    const onEditRoom = (record) => {

        // Modal.confirm({
        //     title: 'Edit Room',
        //     onOk={},
        //     onCancel={},
        //     footer={[
        //         <Button key="back" onClick={ }>
        //             Return
        //         </Button>,
        //         <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
        //             Submit
        //         </Button>,
        //         <Button
        //             key="link"
        //             href="https://google.com"
        //             type="primary"
        //             loading={loading}
        //             onClick={this.handleOk}
        //         >
        //             Search on Google
        //         </Button>
        //         ]}
        // });
    };


    const fetchApi = (pageSize, current) => {
        const url = '/hotel/rooms?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, rooms = [], pagination } = response;


                if (auth) {
                    setLoading(false);
                    setData({
                        rooms,
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
            rooms: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });
    }, []);


    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    };

    const { rooms, pagination } = data;

    function onAddRoom() {
        Modal.confirm({
            title: 'Add Room',
            icon: <ExclamationCircleOutlined />,
            content: <RoomsForm />,
            okText: 'Submit',
            cancelText: 'Cancel',
            width: 800
        });
    }

    return (
        <div>
            <Row justify="end">
                <Col>
                    <Link to='/roomsForm'>
                        <Button loading={loading}>
                            <PlusOutlined style={{ marginRight: 8 }} /> Add Room
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={rooms}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            >
                <Table.Footer></Table.Footer>
            </Table>
        </div >
    )
}

export default RoomTable;