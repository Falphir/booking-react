import './RoomTable.css';
import React, { useState, useEffect } from 'react';
import Config from '../../../config';
import { Table, Modal, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const RoomTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        rooms: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });

    //Renderizar Imagem
    const renderImage = (text, record) => {
        return (
            <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                // src={record.image} 
                alt="Room Image" style={{ width: 150 }, { height: 75 }} />
        );
    }

    //Renderizar Tags
    const renderTags = (tags) => {
        return tags.map((tag) => {
            return (
                <label key={tag._id}>

                    <Tag color="blue">Type Room: {tag.typeRoom} </Tag>
                    <Tag color="blue">VIP: {tag.vip.toString()}</Tag>
                    <Tag color="blue">Nº Pool: {tag.nPool}</Tag>
                    <Tag color="blue">Car Park: {tag.carPark.toString()}</Tag>
                    <Tag color="blue">Breakfast: {tag.breakfast.toString()}</Tag>
                    <Tag color="blue">Lunch: {tag.lunch.toString()}</Tag>
                    <Tag color="blue">Spa: {tag.spa.toString()}</Tag>
                    <Tag color="blue">Nº Stars: {tag.nStars}</Tag>
                    <Tag color="blue">Nº Single Bed: {tag.nSingleBed}</Tag>
                    <Tag color="blue">Nº Double Bed: {tag.nDoubleBed}</Tag>
                </label>
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
            title: 'Tags',
            dataIndex: 'tags',
            render: renderTags,
        },
        {
            title: 'Actions',
            render: (record) => {
                return <>
                    <EditOutlined />
                    <DeleteOutlined onClick={() => { onDeleteRoom(record) }} style={{ color: "red", marginLeft: 12 }} />
                </>
            }
        }

    ];

    const onDeleteRoom = (record) => {

        Modal.confirm({
            title: 'Are you sure, you want to delete this room?',
            onOk: () => {
                setData((pre) => {
                    return pre.filter((room) => room.id !== record.id);
                    //pre.filter((rooms.map((room) => { return room._id }) !== record._id))
                });
            },
        });
    };


    const fetchApi = (pageSize, current) => {
        const url = '/hotel/rooms?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
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
        <Table
            columns={columns}
            rowKey={record => record._id}
            dataSource={rooms}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default RoomTable;