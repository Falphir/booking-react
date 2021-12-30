import React, { useState, useEffect } from 'react';
import Config from '../../config';
import { List, Card, Col, Row } from 'antd';
import { Link, useParams } from 'react-router-dom';

const { Meta } = Card;

function RoomDetails() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        rooms: [],
        pagination: {
            current: 1,
            pageSize: 5,
            total: 0
        }
    });


    //Renderizar Tags
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
        { title: 'Description', value: 'description', },
        { title: 'Nº Adults', value: 'nAdult', },
        { title: 'Nº Children', value: 'nChild', },
        { title: 'Nº Rooms', value: 'nRoom', },
        { title: 'Price (€)', value: 'price', },
        { title: 'Tags', value: 'tags', render: renderTags }
    ];

    const fetchApi = (pageSize, current) => {
        const url = '/hotel/rooms/' + id + new URLSearchParams({})

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


    const { rooms, pagination } = data;

    return (

        <List grid={{ gutter: 16, column: 5 }} dataSource={rooms} columns={columns} rowKey={record => record._id} loading={loading}
            renderItem={item => (
                <List.Item>
                    <Link to={`/rooms/room/${item._id}`}>
                        <Card className='card' key={item._id} cover={<img alt="example" src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />}>
                            <Meta
                                title={<p><span style={{ fontWeight: 'bold' }}>{item.description}</span></p>}>
                            </Meta>

                            <p></p>

                            <div className="additional">
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <div key={item._id}>
                                            {item.tags.map(tag => {
                                                return (
                                                    <>{tag.nStars} <i class="fas fa-star"></i></>
                                                );
                                            })}
                                        </div>

                                    </Col>

                                    <Col span={6}>
                                        {item.nAdult} <i class="fas fa-user-alt"></i>
                                    </Col>

                                    <Col span={6}>
                                        {item.nChild} <i class="fas fa-child"></i>
                                    </Col>

                                    <Col span={6}>
                                        {item.price} <i class="fas fa-euro-sign"></i>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Link>
                </List.Item>
            )}>
            <p></p>
        </List>
    )
}

export default RoomDetails;
