import './RoomTable.css';
import React, { useState, useEffect } from 'react';
import Config from '../../../config';
import { Table, Modal, Tag, Button, Row, Col, Input, InputNumber } from 'antd';
import { SelectOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RoomsForm from './add/RoomsForm';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const RoomTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null)
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
            sorter: (a, b) => a.description.localeCompare(b.description),
            defaultSortOrder: 'ascend',
        },

        {
            title: 'Nº Adults',
            dataIndex: 'nAdult',
            sorter: (a, b) => a.nAdult - b.nAdult,
        },

        {
            title: 'Nº Children',
            dataIndex: 'nChild',
            sorter: (a, b) => a.nChild - b.nChild,
        },

        {
            title: 'Nº Rooms',
            dataIndex: 'nRoom',
            sorter: (a, b) => a.nRoom - b.nRoom,
        },

        {
            title: 'Price (€)',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
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
            fixed: 'right',
            render: (record) => {
                return <>
                    <Row justify='center'>
                        <Link to={`/rooms/${record._id}`}><SelectOutlined style={{ color: "blue" }} /></Link>
                        <EditOutlined onClick={() => { onEditRoom(record) }} style={{ marginLeft: 12 }} />
                        <DeleteOutlined onClick={() => { onDeleteRoom(record) }} style={{ color: "red", marginLeft: 12 }} />
                    </Row>
                </>
            }
        }

    ];

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
        setIsEditing(true)
        setEditingRoom({ ...record })
    };

    const resetEditing = () => {
        setIsEditing(false)
        setEditingRoom(null)
    }


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

    return (
        <div>
            <Row justify="end">
                <Col>
                    <Link to='/roomsForm'>
                        <Button loading={loading} style={{ marginBottom: 8 }}>
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
                scroll={{ x: 1500 }}
                sticky

            >
                <Table.Footer></Table.Footer>
            </Table>

            <Modal
                title="Edit Room"
                visible={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing()
                }}
                onOk={() => {
                    setIsEditing(false);
                    resetEditing()
                }}
            >
                <TextArea value={editingRoom?.description} onChange={(e) => {
                    setEditingRoom(pre => {
                        return { ...pre, description: e.target.value }
                    })
                }} />
                <InputNumber value={editingRoom?.nAdult} onChange={(e) => {
                    setEditingRoom(pre => {
                        return { ...pre, nAdult: e.target.value }
                    })
                }} />
                <InputNumber value={editingRoom?.nChild} onChange={(e) => {
                    setEditingRoom(pre => {
                        return { ...pre, nChild: e.target.value }
                    })
                }} />
                <InputNumber value={editingRoom?.nRoom} onChange={(e) => {
                    setEditingRoom(pre => {
                        return { ...pre, nRoom: e.target.value }
                    })
                }} />
                <InputNumber value={editingRoom?.price} onChange={(e) => {
                    setEditingRoom(pre => {
                        return { ...pre, price: e.target.value }
                    })
                }} />
            </Modal>
        </div >
    )
}

export default RoomTable;