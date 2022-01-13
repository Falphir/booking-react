import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SelectOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, List, Card, Col, Row, Popover } from 'antd';

const { Meta } = Card;


function useWindowSize() {
    // Initialize state with undefined width so server and client renders match
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


const MyFavorites = (props) => {

    const Size = useWindowSize();
    const [loading, setLoading] = useState();
    const [userLogged, setUserLogged] = useState();
    const [data, setData] = useState({
        favorites: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });
    let idUser, currentID;


    useEffect(() => {

        fetchApi(data.pagination.pageSize, data.pagination.current);

        fetch('/auth/me', {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {

                setUserLogged(response.auth);

                if (response.auth == false) {
                    localStorage.removeItem('idUser');
                }

                idUser = response.decoded[1];
                localStorage.setItem('idUser', response.decoded[1]);
                console.log("idUser " + response.decoded[1]);
            })

            .catch(() => {
                setUserLogged(false);
            })

        return () => setData({
            favorites: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });

    }, []);


    const columns = [
        /* {
            title: 'ID Room',
            dataIndex: 'idRoom',
        } */
        {
            title: 'Room',
            render: (record) => {
                return <>
                    <Link to={`/rooms/${record.idRoom}`}><SelectOutlined style={{ color: "blue", marginLeft: 12 }} /></Link>
                </>
            }
        }
    ];

    const onViewRoom = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to see this room?',
            onOk: () => {
                <Link to={`/rooms/${record.idRoom}`}></Link>
            },
        });
    };

    const fetchApi = (pageSize, current) => {

        currentID = localStorage.getItem('idUser');

        console.log("FETCHAPI idUser " + currentID);

        const url = '/favorite/user/favorites/' + currentID + '?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, favorites = [], pagination } = response;


                if (auth) {
                    setLoading(false);
                    setData({
                        favorites,
                        pagination: {
                            current: pagination.page + 1 || 1,
                            pageSize: pagination.pageSize || 10,
                            total: pagination.total || 5
                        }
                    })
                }
            });
    }

    const RemoveFavorite = (item) => {

    }

    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    };

    var ncolumn = 5

    if (Size.width < 576) {
        ncolumn = 1
    } else if (Size.width >= 576 && Size.width < 768) {
        ncolumn = 2
    } else if (Size.width >= 768 && Size.width < 992) {
        ncolumn = 3
    } else if (Size.width >= 992 && Size.width < 1200) {
        ncolumn = 4
    } else if (Size.width >= 1200) {
        ncolumn = 5
    }

    const { favorites, pagination } = data;

    return (
        <>
            <List grid={{ gutter: 16, column: ncolumn }} dataSource={favorites} pagination={pagination} rowKey={record => record._id} loading={loading}
                renderItem={item => (
                    <List.Item>
                        <Popover placement="topLeft" title="Settings" content={<a onClick={RemoveFavorite(item)}><DeleteOutlined style={{ color: 'red' }} /> Remove Favorite</a>}>
                            <Link to={`/rooms/${item.idRoom}`}>
                                <Card className='card' cover={<img className='card-img' alt="example" src={item.Room.image} />}>
                                    <Meta
                                        title={<span style={{ fontWeight: 'bold' }}>{item.Room.description}</span>}>
                                    </Meta>

                                    <div className="additional" style={{ marginTop: 16 }}>
                                        <Row justify='center'>
                                            <Col flex="auto">
                                                {item.Room.nStars} <i class="fas fa-star"></i>
                                            </Col>

                                            <Col flex="auto">
                                                {item.Room.nAdult} <i class="fas fa-user-alt"></i>
                                            </Col>

                                            <Col flex="auto">
                                                {item.Room.nChild} <i class="fas fa-child"></i>
                                            </Col>

                                            <Col flex="auto">
                                                {item.Room.price} <i class="fas fa-euro-sign"></i>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Link>
                        </Popover>
                    </List.Item>
                )}>
                <p></p>
            </List>

            {/*  <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={favorites}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            /> */}
        </>
    )
}

export default MyFavorites;