import { Table } from 'antd';
import { useState, useEffect } from 'react';
import './ReserveTable.css';


const MyReserves = (props) => {

    const [loading, setLoading] = useState();
    const [userLogged, setUserLogged] = useState();
    const [data, setData] = useState({
        reserves: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });
    let idUser, nameUser, a;



    useEffect(() => {

        fetchApi(data.pagination.pageSize, data.pagination.current);


        fetch('/auth/me', {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {

                setUserLogged(response.auth);
                idUser = response.decoded[1];
                nameUser = response.decoded[2];
                console.log("idUser " + response.decoded[1]);
                console.log("nameUser " + response.decoded[2]);
            })

            .catch(() => {
                setUserLogged(false);
            })

        return () => setData({
            reserves: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });

    }, []);


    const columns = [
        {
            title: 'Date Check In',
            dataIndex: 'dateCheckIn',
        },
        {
            title: 'Date Check Out',
            dataIndex: 'dateCheckOut',
        },
        {
            title: 'ID User',
            dataIndex: 'idUser',
        },
        {
            title: 'ID Room',
            dataIndex: 'idRoom',
        }
    ];


    const fetchApi = (pageSize, current) => {

        a = idUser;

        console.log("FETCHAPI idUser " + idUser); //ERRO fica undefined

        const url = '/reserve/user/reserves/' + a + '?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, reserves = [], pagination } = response;


                if (auth) {
                    setLoading(false);
                    setData({
                        reserves,
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

    const { reserves, pagination } = data;

    return (
        <Table
            columns={columns}
            rowKey={record => record._id}
            dataSource={reserves}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default MyReserves;