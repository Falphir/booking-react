import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import './RoomsForm.css';
import Config from '../../../../config';
import { Form, Button, Checkbox, Input, Select, Row, Col, Upload, message, Card, InputNumber } from "antd";
import { InboxOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from "axios"
import { storage } from '../../../../firebase';
import Modal from "antd/lib/modal/Modal";

const { Dragger } = Upload;
const { TextArea } = Input;


const RoomsForm = () => {

    const { register, handleSubmit } = useForm();
    const { state, setState } = useState({
        selectedFile: null
    });
    const onSubmit = e => postRoom(onFinish(e));
    // const onSubmit = data => postRoom(buildRooms(data));
    const [roomForm] = Form.useForm();


    const [image, setImage] = useState(null);
    const [vip, setVip] = useState();
    const [carPark, setCarPark] = useState();
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [spa, setSpa] = useState();
    const [url, setUrl] = useState("");

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (file) => {
        if (file != null) {
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url);
                            setUrl(url);
                        });
                }
            )
        }

    }

    console.log("image: ", image);

    const postRoom = (data) => {
        fetch('/hotel/rooms', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            timout: 1000,
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {

                    console.log(response);
                    alert("Room created");
                    return (
                        <>
                            {response.json()}

                        </>
                    )

                } else {

                    console.log(response);
                    alert("Room duplicate");
                }
            })

            .catch((err) => {
                console.error('error:', err);
            });
    }



    const buildRooms = (data) => {
        return {
            ...data,
            image: url,
            tags: [
                {
                    typeRoom: data.typeRoom,
                    vip: data.vip,
                    nPool: data.nPool,
                    carPark: data.carPark,
                    breakfast: data.breakfast,
                    lunch: data.lunch,
                    spa: data.spa,
                    nStars: data.nStars,
                    nSingleBed: data.nSingleBed,
                    nDoubleBed: data.nDoubleBed
                }
            ]
        }
    };

    useEffect(() => {
        handleUpload(image);
    }, [image]);

    const onFinish = (e) => {
        console.log(e);

        setSpa(false);
        setVip(false);
        setBreakfast(false);
        setCarPark(false);
        setLunch(false);

        for (var i = 0; i < e.extras.length; i++) {
            // switch (e.extras[i]) {
            //     case 'vip': setVip(true);
            //         break;
            //     case 'breakfast': setBreakfast(true);
            //         break;
            //     case 'lunch': setLunch(true);
            //         break;
            //     case 'carPark': setCarPark(true);
            //         break;
            //     case 'spa': setSpa(true);
            //         break;
            // }
        }
        return {
            image: url,
            description: e.description,
            nAdult: e.nAdults,
            nChild: e.nChildren,
            nRoom: e.nRooms,
            price: e.price,
            tags: [
                {
                    typeRoom: e.typeRoom,
                    nPool: e.nPool,
                    nSingleBed: e.nSingleBed,
                    nDoubleBed: e.nDoubleBed,
                    nStars: e.nStars,
                    vip: vip,
                    carPark: carPark,
                    breakfast: breakfast,
                    lunch: lunch,
                    spa: spa
                }
            ]
        }
    }




    return (

        <div >
            <Row style={{ paddingTop: 120 }}>
                <Col span={8}></Col>
                <Col span={8}>
                    <Row justify="center">
                        <div className="site-card-border-less-wrapper">
                            <Card className="card" title="Add Room Form" bordered={true} style={{ width: 900, }}>
                                <Form onFinish={onSubmit}>
                                    <Form.Item name="description" label="Description">
                                        <TextArea rows={4} placeholder="Description of the room" />
                                        {/* <Input placeholder="Type room description" /> */}
                                    </Form.Item>
                                    <Form.Item name="nAdults" label="Number of Adults">
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item name="nChildren" label="Number of Childrens">
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item name="nRooms" label="Number of Rooms">
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item name="price" label="Price">
                                        <InputNumber />
                                    </Form.Item>
                                    <h3><b>Tags</b></h3>
                                    <Form.Item name="typeRoom" label="Type Room">
                                        <Select placeholder="Type of Room" >
                                            <Select.Option value="Apartamento" />
                                            <Select.Option value="Quarto" />
                                            <Select.Option value="Casa de Férias" />
                                            <Select.Option value="Hostel" />
                                            <Select.Option value="Casa de Campo" />
                                            <Select.Option value="Outro" />
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="nPool" label="Number of Pools">
                                        <InputNumber placeholder="Type number of Pools" />
                                    </Form.Item>
                                    <Form.Item name="nSingleBed" label="Number of single beds">
                                        <InputNumber placeholder="Type number of single beds" />
                                    </Form.Item>
                                    <Form.Item name="nDoubleBed" label="Number of double beds">
                                        <InputNumber placeholder="Type number of double beds" />
                                    </Form.Item>
                                    <Form.Item name="nStars" label="Number of Stars" style={{ width: 175 }}>
                                        <Select>
                                            <Select.Option value="0" />
                                            <Select.Option value="1" />
                                            <Select.Option value="2" />
                                            <Select.Option value="3" />
                                            <Select.Option value="4" />
                                            <Select.Option value="5" />
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="extras" label="Extras">
                                        <Checkbox.Group>
                                            <Row>
                                                <Col>
                                                    <Checkbox value="vip" style={{ lineHeight: '32px' }}>
                                                        VIP
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="carPark" style={{ lineHeight: '32px' }}>
                                                        Car Park
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="breakfast" style={{ lineHeight: '32px' }}>
                                                        Breakfast
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="lunch" style={{ lineHeight: '32px' }}>
                                                        Lunch
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="spa" style={{ lineHeight: '32px' }}>
                                                        Spa
                                                    </Checkbox>
                                                </Col>
                                                {/* {(fields, { add, remove }, { errors }) => (
                                                    <Col>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...(index === 0) }
                                                                label={index === 0 ? 'Passengers' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input passenger's name or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input placeholder="passenger name" style={{ width: '60%' }} />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => remove(field.name)}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                    </Col>
                                                )}; */}
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <input type="file" onChange={handleChange} />
                                    {/* <button onClick={handleUpload}>Upload</button> */}
                                    <Form.Item style={{ paddingTop: 20 }}>
                                        <Button block size="large" type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Row>

                    {url}
                </Col>
                <Col span={8}></Col>
            </Row >
        </div >

        // <div>
        //     <Row justify="center">
        //         <Col>
        //             <h2>Add Room Form</h2>
        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col span={8}></Col>
        //         <Col span={8}>
        //             <div>
        //                 <form id="add-room-form" className="form-Rooms" onSubmit={handleSubmit(onSubmit)}>
        //                     <div className="field">
        //                         <label>Description: </label>
        //                         <input {...register('description')}></input>
        //                     </div>

        //                     <div className="field">
        //                         <label>Nº Adults: </label>
        //                         <input {...register('nAdult')}></input>
        //                     </div>

        //                     <div className="field">
        //                         <label>Nº Children: </label>
        //                         <input {...register('nChild')}></input>
        //                     </div>

        //                     <div className="field">
        //                         <label>Nº Rooms: </label>
        //                         <input {...register('nRoom')}></input>
        //                     </div>

        //                     <div className="field">
        //                         <label>Price: </label>
        //                         <input {...register('price')}></input>
        //                     </div>

        //                     <div className="field">
        //                         <label>Tags: </label>

        //                         <br></br>

        //                         <label>Type Room: </label>
        //                         <select {...register('typeRoom')}>
        //                             <option value="Apartamento">Apartamento</option>
        //                             <option value="Quarto">Quarto</option>
        //                             <option value="Casa de Férias">Casa de Férias</option>
        //                             <option value="Hostel">Hostel</option>
        //                             <option value="Casa de Campo">Casa de Campo</option>
        //                             <option value="Outro">Outro</option>
        //                         </select>

        //                         <br></br>

        //                         <label>Vip: </label>
        //                         <select {...register('vip')}>
        //                             <option value="yes">Yes</option>
        //                             <option value="no">No</option>
        //                         </select>

        //                         <br></br>

        //                         <label>Nº Pool: </label>
        //                         <input {...register('nPool')}></input>

        //                         <br></br>

        //                         <label>Car Park: </label>
        //                         <select {...register('carPark')}>
        //                             <option value="yes">Yes</option>
        //                             <option value="no">No</option>
        //                         </select>

        //                         <br></br>

        //                         <label>BreakFast: </label>
        //                         <select {...register('breakfast')}>
        //                             <option value="yes">Yes</option>
        //                             <option value="no">No</option>
        //                         </select>

        //                         <br></br>

        //                         <label>Lunch: </label>
        //                         <select {...register('lunch')}>
        //                             <option value="yes">Yes</option>
        //                             <option value="no">No</option>
        //                         </select>

        //                         <br></br>

        //                         <label>Spa: </label>
        //                         <select {...register('spa')}>
        //                             <option value="yes">Yes</option>
        //                             <option value="no">No</option>
        //                         </select>

        //                         <br></br>

        //                         <label>Nº Stars: </label>
        //                         <select {...register('nStars')}>
        //                             <option value="0">0</option>
        //                             <option value="1">1</option>
        //                             <option value="2">2</option>
        //                             <option value="3">3</option>
        //                             <option value="4">4</option>
        //                             <option value="5">5</option>
        //                         </select>

        //                         <br></br>

        //                         <label>Nº Single Bed: </label>
        //                         <input {...register('nSingleBed')}></input>

        //                         <br></br>

        //                         <label>Nº Double Bed: </label>
        //                         <input {...register('nDoubleBed')}></input>
        //                     </div>

        //                     <input type="file" onChange={handleChange} />

        //                     <input className="submit" type="submit"></input>
        //                 </form>
        //             </div>
        //         </Col>
        //         <Col span={8}></Col>
        //     </Row>
        // </div>
    );
}


export default RoomsForm;