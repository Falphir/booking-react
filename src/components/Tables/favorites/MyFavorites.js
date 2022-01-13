import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SelectOutlined } from '@ant-design/icons';
import { Modal } from 'antd';


const MyFavorites = (props) => {

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

        fetchShowApi();

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
                    <Link to={`/rooms/${record.idRoom}`}><SelectOutlined  style={{ color: "blue", marginLeft: 12 }} /></Link>
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

    const fetchShowApi = (pageSize, current) => {
        const url = '/hotel/rooms/'+ favorites.idRoom + new URLSearchParams({
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

    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    };

    const { favorites, pagination } = data;

    return (
        <Table
            columns={columns}
            rowKey={record => record._id}
            dataSource={favorites}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default MyFavorites;