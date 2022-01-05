import './RoomsCard.css';
import React, { useState, useEffect } from 'react';
import Config from '../../../config';
import { List, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom'
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

const LessStarsRoomsCard = (props) => {

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



    const columns = [
        { title: 'Description', value: 'description', },
        { title: 'Nº Adults', value: 'nAdult', },
        { title: 'Nº Children', value: 'nChild', },
        { title: 'Nº Rooms', value: 'nRoom', },
        { title: 'Price (€)', value: 'price', },
        { title: 'Nº Stars', value: 'nStars', },
        //{ title: 'Tags', value: 'tags', render: renderTags }
    ];


    const fetchApi = (pageSize, current) => {
        const url = '/hotel/rooms/lessstars?' + new URLSearchParams({
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

    var ncolumn = 5

    if (Size.width < 576) {
        ncolumn = 2
    } else if (Size.width >= 576 && Size.width < 996) {
        ncolumn = 3
    } else if (Size.width >= 996 && Size.width < 1920) {
        ncolumn = 4
    } else if (Size.width >= 1920) {
        ncolumn = 5
    }

    return (
        <List grid={{ gutter: 16, column: ncolumn }} dataSource={rooms} pagination={pagination} columns={columns} rowKey={record => record._id} loading={loading}
            renderItem={item => (
                <List.Item>
                    <Link to={`/rooms/${item._id}`}>
                        <Card key={item._id} cover={<img alt="example" src={item.image} />}>
                            <Meta
                                title={<p><span style={{ fontWeight: 'bold' }}>{item.description}</span></p>}>
                            </Meta>

                            <p></p>

                            <div className="additional">
                                <Row xs={24} xl={16}>
                                    <Col xs={24} xl={8}>
                                        {item.nStars} <i class="fas fa-star"></i>
                                    </Col>

                                    <Col xs={20} xl={4}>
                                        {item.nAdult} <i class="fas fa-user-alt"></i>
                                    </Col>

                                    <Col xs={24} xl={8}>
                                        {item.nChild} <i class="fas fa-child"></i>
                                    </Col>

                                    <Col xs={20} xl={4}>
                                        {item.price} <i class="fas fa-euro-sign"></i>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Link>
                </List.Item>
            )}>
        </List>
    )
}

export default LessStarsRoomsCard;