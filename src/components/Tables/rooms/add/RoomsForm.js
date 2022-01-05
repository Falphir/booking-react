import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import './RoomsForm.css';
import Config from '../../../../config';
import { Form, Button, Checkbox, Input, Select, Row, Col, Upload, message, Card, InputNumber, Tooltip } from "antd";
import { InboxOutlined, UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { storage } from '../../../../firebase';
import Modal from "antd/lib/modal/Modal";
import logo from '../../../../assets/logo/logo_simples.png'


const { Dragger } = Upload;
const { TextArea } = Input;


const RoomsForm = () => {

    const { register, handleSubmit } = useForm();
    const [checkboxList, setCheckboxList] = useState([{ value: "" }]);
    const { state, setState } = useState({
        selectedFile: null
    });
    const onSubmit = e => postRoom(onFinish(e));
    // const onSubmit = data => postRoom(buildRooms(data));
    const [roomForm] = Form.useForm();


    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [submit, setSubmit] = useState();
    //const [isModalVisible, setIsModalVisible] = useState(false);

    // const showModal = () => {
    //   setIsModalVisible(true);
    // };

    const handleChange = e => {
        console.log(e)
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
                            if (url = null) {
                                setSubmit(false);
                            } else {
                                setSubmit(true);
                            }

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

        return {
            image: url,
            description: e.description,
            nAdult: e.nAdults,
            nChild: e.nChildren,
            nRoom: e.nRooms,
            price: e.price,
            typeRoom: e.typeRoom,
            nSingleBed: e.nSingleBed,
            nDoubleBed: e.nDoubleBed,
            nStars: e.nStars,
            extras: e.extras
        }
    }

    // // handle click event of the Remove button
    // const handleRemoveClick = index => {
    //     const list = [...checkboxList];
    //     list.splice(index, 1);
    //     setCheckboxList(list);
    // };

    // // handle click event of the Add button
    // const handleAddClick = () => {
    //     setCheckboxList([...checkboxList, { firstName: "", lastName: "" }]);
    // };

    // const onAddExtra = () => {
    //     return (
    //         <Modal title="Add Extra" footer={[
    //             <Button form="addExtraForm" key="submit" htmlType="submit">
    //                 Add Extra
    //             </Button>
    //         ]}>
    //             <Form id="addExtraForm" onFinish={onAddExtraFormFinish} layout="vertical">
    //                 <Form.Item name="new_checkbox" label="New Checkbox">
    //                     <Input placeholder="Checkbox Value"></Input>
    //                 </Form.Item>
    //             </Form>
    //         </Modal>
    //     )
    // }

    // const onAddExtraFormFinish = (extra) => {
    //     setIsModalVisible(false)
    //     setCheckboxList({
    //         value: extra.new_checkbox,
    //     })
    // }


    return (
        <div >
            <Row style={{ paddingTop: 120 }}>
                <Col span={8}></Col>
                <Col span={8}>
                    <Row justify="center">
                        <div >
                            <Card headStyle={{ backgroundColor: "#242424" }} bodyStyle={{ backgroundColor: "#242424" }} className="login-card" title={

                                <Row justify='center'>
                                    <Col>
                                        <div className='card-logo'>
                                            <img className='rooms-Logo' src={logo} />
                                        </div>
                                        <Row justify='center'>
                                            <h2 className='rooms-card-title-h2'>
                                                <b>Add Room</b>
                                            </h2>
                                        </Row>
                                    </Col>
                                </Row>}
                                bordered={false} style={{ width: 600 }}>
                                <Form layout="vertical" onFinish={onSubmit}>
                                    <Form.Item name="description" label={<h4 className='rooms-form-label-h4'><b>Description</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input a description!',
                                            },
                                        ]} >
                                        <TextArea rows={4} placeholder="Description of the room" required />
                                        {/* <Input placeholder="Type room description" /> */}
                                    </Form.Item>
                                    <Form.Item name="nAdults" label={<h4 className='rooms-form-label-h4'><b>Number of Adults</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the number of adults!',
                                            },
                                        ]} >
                                        <InputNumber required />
                                    </Form.Item>
                                    <Form.Item name="nChildren" label={<h4 className='rooms-form-label-h4'><b>Number of Childrens</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the number of childrens!',
                                            },
                                        ]} >
                                        <InputNumber required />
                                    </Form.Item>
                                    <Form.Item name="nRooms" label={<h4 className='rooms-form-label-h4'><b>Number of Rooms</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the number of rooms!',
                                            },
                                        ]} >
                                        <InputNumber required />
                                    </Form.Item>
                                    <Form.Item name="price" label={<h4 className='rooms-form-label-h4'><b>Price</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input a price!',
                                            },
                                        ]} >
                                        <InputNumber required />
                                    </Form.Item>
                                    <Form.Item name="typeRoom" label={<h4 className='rooms-form-label-h4'><b>Type of Room</b></h4>} style={{ width: 400 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please choose a Type of room!',
                                            },
                                        ]}>
                                        <Select placeholder="Type of Room" required>
                                            <Select.Option value="Apartamento" />
                                            <Select.Option value="Quarto" />
                                            <Select.Option value="Casa de Férias" />
                                            <Select.Option value="Hostel" />
                                            <Select.Option value="Casa de Campo" />
                                            <Select.Option value="Outro" />
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="nSingleBed" label={<h4 className='rooms-form-label-h4'><b>Number of Single Beds</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the number of single Beds!',
                                            },
                                        ]}>
                                        <InputNumber required/>
                                    </Form.Item>
                                    <Form.Item name="nDoubleBed" label={<h4 className='rooms-form-label-h4'><b>Number of Double Beds</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the number of double beds!',
                                            },
                                        ]}>
                                        <InputNumber required/>
                                    </Form.Item>
                                    <Form.Item name="nStars" label={<h4 className='rooms-form-label-h4'><b>Number of Stars</b></h4>} style={{ width: 175 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please choose the number of stars',
                                            },
                                        ]}>
                                        <Select required>
                                            <Select.Option value="0" />
                                            <Select.Option value="1" />
                                            <Select.Option value="2" />
                                            <Select.Option value="3" />
                                            <Select.Option value="4" />
                                            <Select.Option value="5" />
                                        </Select>
                                    </Form.Item>
                                    <h3 className='rooms-extra-h3'><b>Extras</b></h3>
                                    <Form.Item name="extras">
                                        <Checkbox.Group>
                                            <Row>
                                                <Col>
                                                    <Checkbox value="vip" style={{ lineHeight: '32px', color: '#fff' }}>
                                                        VIP
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="carPark" style={{ lineHeight: '32px', color: '#fff' }}>
                                                        Car Park
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="breakfast" style={{ lineHeight: '32px', color: '#fff' }}>
                                                        Breakfast
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="lunch" style={{ lineHeight: '32px', color: '#fff' }}>
                                                        Lunch
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="spa" style={{ lineHeight: '32px', color: '#fff' }}>
                                                        Spa
                                                    </Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox value="pool" style={{ lineHeight: '32px', color: '#fff' }}>
                                                        Pool
                                                    </Checkbox>
                                                </Col>
                                                {/* {checkboxList.map((x, i) => {
                                                    <Col>
                                                        <Checkbox value={x.value} style={{ lineHeight: '32px' }}>
                                                            {x.value}
                                                        </Checkbox>
                                                    </Col>
                                                })} */}
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <input style={{ color: '#fff' }} type="file" onChange={handleChange} />
                                    {/* <button onClick={handleUpload}>Upload</button> */}
                                    <Form.Item style={{ paddingTop: 20 }}>
                                        {submit &&
                                            <Button block size="large" className='rooms-Button-Outlined' htmlType="submit">
                                                <b>Submit</b>
                                            </Button>}
                                        {!submit &&
                                            <Tooltip placement="top" title={<span>Image not uploaded</span>}>
                                                <Button disabled block size="large" htmlType="submit">
                                                <b>Submit</b>
                                                </Button>
                                            </Tooltip>}
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Row>
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