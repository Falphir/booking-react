import React, { useState, useEffect } from 'react';
import Config from '../../config';
import { List, Card, Col, Row, Button, DatePicker, Form, Image, Space, Rate, Tabs, Table, Layout, Divider, Tag } from 'antd';
import { useParams, Link } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import { set, useForm } from "react-hook-form";
import Footer from '../Footer';


const { TabPane } = Tabs;
const { Meta } = Card;


function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}


const RoomDetails = (props) => {

    const Size = useWindowSize();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        rooms: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });

    const { roomId } = useParams();

    // Renderizar Extras
    const RenderExtras = () => {
        console.log(rooms.extras)
        if (rooms.extras == undefined) {
            console.log("extras undefined")
        } else {
            console.log("extras ready")
            return rooms.extras.map((extra) => <Tag  color="blue">{extra}</Tag>)
        }

    }






    const columns = [
        { title: 'Facilities', dataIndex: 'facilities' },
        { title: 'Quantity', dataIndex: 'quantity', width: '10%', align: 'center' },
    ];

    const Extracolumns = [
        { title: 'Extras', dataIndex: 'extras', render: RenderExtras },
    ];





    const fetchApi = (pageSize, current) => {
        const url = '/hotel/rooms/' + roomId + '?' + new URLSearchParams({
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





    const { rooms, pagination } = data;


    function callback(key) {
        console.log(key);
    }

    const tableData = [
        {
            key: 1,
            facilities: 'Number of Double Bed',
            quantity: rooms.nDoubleBed,
        },
        {
            key: 2,
            facilities: 'Number of Single Bed',
            quantity: rooms.nSingleBed,
        },
        {
            key: 3,
            facilities: 'Number Rooms',
            quantity: rooms.nRoom,
        },
    ]

    const ExtrastableData = [
        {
            key: 1,
            extras: {RenderExtras},
        },
    ]

    return (
        <>

            <Row style={{ padding: 30 }}>
                <Col span={2}></Col>
                <Col span={20}>
                    <Card bordered={true}>
                        <List grid={{
                            gutter: 8,
                            itemLayout: 'horizontal',
                            column: 2,
                        }}>
                            <List.Item>
                                <Row justify='center'>
                                <Image src={rooms.image}></Image>
                                </Row>
                            </List.Item>
                            <List.Item>
                                <Card bordered={false} title={<h3><b>{rooms.description}</b></h3>}>
                                    <Row>
                                        <Col span={16}>
                                            <Row justify='start'>
                                                <p className='rooms-details-price-label'><b className='rooms-details-price'>{rooms.price}€ </b>p/Pessoa</p>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row justify='end'>
                                                <Rate disabled value={rooms.nStars}></Rate>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 10 }}>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={24}>
                                                    <h4><b> Type of Room </b></h4>
                                                    <Row justify='start'>
                                                        {rooms.typeRoom}
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Divider style={{ marginTop: 0 }}></Divider>
                                            <Row>
                                                <h4><b> Capacity </b></h4>
                                            </Row>
                                            <Divider style={{ marginTop: 0 }}></Divider>
                                            <Row justify='start'>
                                                <div className='rooms-details-icons'><i class="fas fa-user-alt"></i> {rooms.nAdult} </div>
                                            </Row>
                                            <Row justify='start'>
                                                <div className='rooms-details-icons'><i class="fas fa-child"></i> {rooms.nChild}  </div>
                                            </Row>
                                            <Row style={{ paddingTop: 20 }}>
                                                
                                                <Link to={`/reserves/${roomId}`}>
                                                    <Button type='primary'>Reserve This Room</Button>
                                                </Link>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </List.Item>
                            <Row>
                                <Col span={24}>
                                    <Tabs defaultActiveKey="1" onChange={callback}>
                                        <TabPane tab="Information" key="1">
                                            <Table columns={columns} dataSource={tableData} pagination={false} />
                                            <Table columns={Extracolumns} dataSource={ExtrastableData} pagination={false} />
                                        </TabPane>
                                        <TabPane tab="Comments" key="2">
                                            Content of Tab Pane 2
                                        </TabPane>
                                        <TabPane tab="Ratings" key="3">
                                            Content of Tab Pane 3
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                        </List>
                    </Card>
                </Col>
                <Col span={2}></Col>
            </Row>

            {/* <List grid={{ gutter: 16, column: ncolumn }} columns={columns}>
                <Card key={roomId}
                    cover={<img alt="example" src={rooms.image} />}>
                    <Meta
                        title={<p><span style={{ fontWeight: 'bold' }}>{rooms.description}</span></p>}>
                    </Meta>

                    <p></p>

                    <div className="additional">
                        <Row xs={24} xl={16}>
                            <Col xs={24} xl={8}>
                                {rooms.nStars} <i class="fas fa-star"></i>
                            </Col>

                            <Col xs={20} xl={4}>
                                {rooms.nAdult} <i class="fas fa-user-alt"></i>
                            </Col>

                            <Col xs={24} xl={8}>
                                {rooms.nChild} <i class="fas fa-child"></i>
                            </Col>

                            <Col xs={20} xl={4}>
                                {rooms.price} <i class="fas fa-euro-sign"></i>
                            </Col>
                        </Row>
                    </div>

                    <br></br>

                    <div className="additional">
                        <Row xs={24} xl={16}>
                            <Col xs={24} xl={8}>
                                Nº Double Bed <i class="fas fa-long-arrow-alt-right"></i> {rooms.nDoubleBed} <i class="fas fa-bed"></i>
                            </Col>

                            <Col xs={24} xl={8}>
                                Nº Single Bed <i class="fas fa-long-arrow-alt-right"></i> {rooms.nSingleBed} <i class="fas fa-bed"></i>
                            </Col>

                            <Col xs={24} xl={8}>
                                Type Room <i class="fas fa-long-arrow-alt-right"></i> <i class="fas fa-home"></i> {rooms.typeRoom}
                            </Col>

                            <Col xs={24} xl={8}>
                                Nº Rooms <i class="fas fa-long-arrow-alt-right"></i> {rooms.nRoom} <i class="fas fa-door"></i>
                            </Col>
                        </Row>
                    </div>

                    <br></br>

                    <div className="additional">
                        <Row xs={24} xl={16}>
                            <Col xs={24} xl={8}>
                                EXTRAS <i class="fas fa-long-arrow-alt-right"></i> {rooms.extras}
                            </Col>
                        </Row>
                    </div>

                    <br></br>

                    <div className="reserves">
                        <Row xs={24} xl={16}>
                            <Link to={`/reserves/${roomId}`}>
                                <Button>Reserve this room</Button>
                            </Link>
                        </Row>
                    </div>
                </Card>
            </List> */}
            <Footer />
        </>
    )
}

export default RoomDetails;