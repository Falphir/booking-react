import './RoomTable.css';
import React, { useState, useEffect } from 'react';
import Config from '../config';
import { Pagination, Table } from 'antd';

const RoomTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        rooms: [],
        pagination: {
            current: 1,
            pageSize: 3,
            total: 0
        }
    });


    const renderTags = (tags) => {
        return tags.map((tag) => {
            return (
                <label key={tag._id}>
                    Type Room: {tag.typeRoom},
                    VIP: {tag.vip.toString()},
                    Nº Pool: {tag.nPool},
                    Car Park: {tag.carPark.toString()},
                    Breakfast: {tag.breakfast.toString()},
                    Lunch: {tag.lunch.toString()},
                    Spa: {tag.spa.toString()},
                    Nº Stars: {tag.nStars},
                    Nº Single Bed: {tag.nSingleBed},
                    Nº Double Bed: {tag.nDoubleBed}
                </label>
            )
        })
    }


    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: '20%',
        },

        {
            title: 'Description',
            dataIndex: 'description',
            width: '20%',
        },

        {
            title: 'Nº Adults',
            dataIndex: 'nAdult',
            width: '6%',
        },

        {
            title: 'Nº Children',
            dataIndex: 'nChild',
            width: '6%',
        },

        {
            title: 'Nº Rooms',
            dataIndex: 'nRoom',
            width: '6%',
        },

        {
            title: 'Price (€)',
            dataIndex: 'price',
            width: '6%',
        },

        {
            title: 'Tags',
            dataIndex: 'tags',
            render: renderTags,
        },
    ];


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