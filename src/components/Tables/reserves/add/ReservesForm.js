import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import './ReservesForm.css';
import React, { useState, useEffect } from 'react';
import Config from "../../../../config";
import { Form, Button, Row, Col, DatePicker, Card } from "antd";


const ReservesForm = () => {
    const { roomId } = useParams();
    const { register, handleSubmit } = useForm();
    const onSubmit = e => postReserve(onFinish(e));
    const [reserveForm] = Form.useForm();
    const [userLogged, setUserLogged] = useState();
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = useState(true);
    var DCI, DCO, userId, userName;


    const postReserve = (data) => {
        console.error("entrou no postReserve");

        fetch('/reserve/reserves/:roomId', {
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
                            {response.json()}
                        </>
                    )

                } else {
                    console.log(response);
                    alert("Reserve duplicate");
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
                userName = response.decoded[2];
                console.log("userId " + response.decoded[1]);
                console.log("userName " + response.decoded[2]);
            })

            .catch(() => {
                setUserLogged(false);
            })
    }, [])

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
            dateCheckIn: DCI,
            dateCheckOut: DCO,
            idUser: userId,
            idRoom: roomId
        }
    }


    return (
        <div>
            <Row style={{ paddingTop: 120 }}>
                <Col span={8}></Col>
                <Col span={8}>
                    <Row justify="center">
                        <div className="site-card-border-less-wrapper">
                            <Card className="card" title={<Row justify='center'><h2 style={{ color: '#405fad', marginBottom: 0 }}><b>RESERVE ROOM</b></h2></Row>} bordered={true} style={{ width: 350 }}>
                                <Form layout='vertical' onFinish={onSubmit}>
                                    <Form.Item label={<h4 style={{ color: '#405fad' }}><b>Date Check In</b></h4>} name="dateCheckIn" >
                                        <Row justify="center">
                                            <DatePicker onChange={onChangeDateCheckIn} style={{ width: 300 }} />
                                        </Row>
                                    </Form.Item>

                                    <Form.Item label={<h4 style={{ color: '#405fad' }}><b>Date Check Out</b></h4>} name="dateCheckOut">
                                        <Row justify="center">
                                            <DatePicker onChange={onChangeDateCheckOut} style={{ width: 300 }} />
                                        </Row>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button block type="primary" htmlType='submit'>Reserve</Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Row>
                </Col>
                <Col span={8}></Col>
            </Row >
        </div >
    );
}

export default ReservesForm;