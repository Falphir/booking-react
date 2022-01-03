import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import './ReservesForm.css';
import React, { useState, useEffect } from 'react';
import Config from "../../../../config";
import { Form, Button, Checkbox, Input, Select, Row, Col, Upload, message, DatePicker, } from "antd";


const ReservesForm = () => {
    const { roomId } = useParams();
    const { register, handleSubmit } = useForm();
    const onSubmit = e => postReserve(onFinish(e));
    const [reserveForm] = Form.useForm();
    const [userLogged, setUserLogged] = useState();
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        reserves: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    });
    var DCI, DCO, userId;


    const postReserve = (pageSize, current, data) => {
        console.error("entrou no postReserve");

        const url = '/reserve/reserves/' + roomId + '?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })

        fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {

                    console.log(response);
                    alert("Reserve created");
                    return (
                        <>
                            response.json();
                        </>
                    )

                } else {
                    console.log(response);
                    alert("Reserve duplicate");
                }
            })


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
            })

            .catch((err) => {
                console.error('Error: ', err);
            });
    }


    useEffect(() => {

        fetch('/auth/me', {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {

                setUserLogged(response.auth);
                userId = response.decoded[1];
                console.log("userId " + response.decoded[1])
            })

            .catch(() => {
                setUserLogged(false);
            })


        postReserve(data.pagination.pageSize, data.pagination.current);

        return () => setData({
            rooms: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });
    }, [])


    const buildReserves = (data) => {

        console.log("entrou no buildReserves");
        console.log("dCI: " + DCI);
        console.log("dCO: " + DCO);
        console.log("ROOMID: " + roomId);
        console.log("userid: " + userId);

        return {
            ...data,
            dCI: DCI,
            dCO: DCO,
            roomId: roomId,
            userId: userId
        }
    };

    const onReset = () => {
        reserveForm.resetFields();
    };

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
        console.log('onOk: ', value);
    }

    function onChangeDateCheckIn(date, DateCheckIn) {
        console.log("date check in: " + DateCheckIn);
        DCI = DateCheckIn;
    }

    function onChangeDateCheckOut(date, DateCheckOut) {
        console.log("date check out: " + DateCheckOut);
        DCO = DateCheckOut;
    }


    const onFinish = (e) => {

        console.log(e);
        console.log("userID: " + userId);
        console.log("DCI: " + DCI);
        console.log("DCO: " + DCO);
        console.log("roomID: " + roomId);

        return {
            DateCheckIn: DCI,
            DateCheckOut: DCO,
            idUser: userId,
            idRoom: roomId
        }
    }


    return (
        <Form onFinish={onSubmit}>
            <Form.Item label="Date Check In" name="dateCheckIn" >
                <DatePicker onChange={onChangeDateCheckIn} />
            </Form.Item>

            <Form.Item label="Date Check Out" name="dateCheckOut">
                <DatePicker onChange={onChangeDateCheckOut} />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType='submit' className='submit'>Reserve</Button>
            </Form.Item>
        </Form>
    );
}

export default ReservesForm;