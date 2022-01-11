import React, { useState, useEffect } from 'react';
import { List, Row, Col, Card } from 'antd'
import { useParams, Link } from 'react-router-dom';
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

const RoomComments = (props) => {

    //const { roomId } = props.data;
    const Size = useWindowSize();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        comments: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });



    const fetchApi = (pageSize, current) => {
        const url = '/comment/comments/' + props.data + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })

        fetch(url, {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, comments = [], pagination } = response;


                if (auth) {
                    setLoading(false);
                    setData({
                        comments,
                        pagination: {
                            current: pagination.page + 1 || 1,
                            pageSize: pagination.pageSize || 10,
                            total: pagination.total || 5
                        }
                    })
                }
            });
    }

    const columns = [
        { title: 'Description', value: 'description', },
        { title: 'Nº Adults', value: 'nAdult', },
        { title: 'Nº Children', value: 'nChild', },
        { title: 'Nº Rooms', value: 'nRoom', },
        { title: 'Price (€)', value: 'price', },
        { title: 'Nº Stars', value: 'nStars', },
        //{ title: 'Tags', value: 'tags', render: renderTags }
    ];

    useEffect(() => {
        fetchApi(data.pagination.pageSize, data.pagination.current);

        return () => setData({
            comments: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });
    }, []);

    const onChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current);
        console.log(pagination.page)
    };



    const { comments, pagination } = data;

    console.log("Room ID: " + props.data)
    return (
        <>
            <h2>{comments.comment}</h2>
            <List grid={{ gutter: 16, column: 1 }} dataSource={comments} pagination={pagination} onChange={onChange} columns={columns} rowKey={record => record._id} loading={loading}
                renderItem={item => (
                    <List.Item>
                        <h2>{item.comment}</h2>
                    </List.Item >
                )}>
            </List >

        </>
    )
}

export default RoomComments
