import React, { useState, useEffect } from 'react';
import { List } from 'antd'


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

    const roomId = props.data
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

    const fetchApi = (pageSize, current) => {
        const url = '/comments/' + {roomId} ({
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

    const onChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current);
        console.log(pagination.page)
    };



    const { rooms, pagination } = data;

    console.log("Room ID: " + props.data)
    return (
        <>
            <List>
                
            </List>
        </>
    )
}

export default RoomComments
