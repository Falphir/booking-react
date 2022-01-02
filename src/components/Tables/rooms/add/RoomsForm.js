import { set, useForm } from "react-hook-form";
import { useState } from "react";
import './RoomsForm.css';
import Config from '../../../../config';
import { Form, Button, Checkbox, Input, Select, Row, Col, Upload, message } from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios"
import { storage } from '../../../../firebase';

const { Dragger } = Upload;


const RoomsForm = () => {

    const { register, handleSubmit } = useForm();
    const { state, setState } = useState({
        selectedFile: null
    });
    const onSubmit = data => postRoom(buildRooms(data));
    const [roomForm] = Form.useForm();

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setUrl(url);
                    });
            }
        )
    }

    const props = {
        name: 'file',
        multiple: true,
        action: {handleUpload},
        onChange: {handleChange}, 
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    console.log("image: ", image);

    const postRoom = (data) => {
        fetch('/hotel/rooms', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {

                    console.log(response);
                    alert("Room created");
                    return response.json();

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
            ...data, tags: [
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

    const onReset = () => {
        roomForm.resetFields();
    };


    return (
        <div>
            <Row justify="center">
                <Col>
                    <h2>Add Room Form</h2>
                </Col>
            </Row>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Item form={roomForm} name="description" label="Description">
                                <Input {...register('description')} placeholder="Type room description" />
                            </Form.Item>
                            <Form.Item name="nAdults" label="Number of Adults">
                                <Input {...register('nAdult')} placeholder="Type adults capacity" />
                            </Form.Item>
                            <Form.Item name="nChildren" label="Number of Childrens">
                                <Input {...register('nChild')} placeholder="Type children capacity" />
                            </Form.Item>
                            <Form.Item name="nRooms" label="Number of Rooms">
                                <Input {...register('nRoom')} placeholder="Type number of Rooms" />
                            </Form.Item>
                            <Form.Item name="price" label="Price">
                                <Input {...register('price')} placeholder="Type room price" />
                            </Form.Item>
                            <h3><b>Tags</b></h3>
                            <Form.Item name="type-room" label="Type Room">
                                <Select {...register('typeRoom')} defaultValue={"Apartamento"}>
                                    <Select.Option value="Apartamento" />
                                    <Select.Option value="Quarto" />
                                    <Select.Option value="Casa de Férias" />
                                    <Select.Option value="Hostel" />
                                    <Select.Option value="Casa de Campo" />
                                    <Select.Option value="Outro" />
                                </Select>
                            </Form.Item>
                            <Form.Item name="nPool" label="Number of Pools">
                                <Input placeholder="Type number of Pools" />
                            </Form.Item>
                            <Form.Item name="nSingleBed" label="Number of single beds">
                                <Input placeholder="Type number of single beds" />
                            </Form.Item>
                            <Form.Item name="nDoubleBed" label="Number of double beds">
                                <Input placeholder="Type number of double beds" />
                            </Form.Item>
                            <Form.Item name="nStars" label="Number of Stars">
                                <Select {...register('nStars')}>
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
                                            <Checkbox {...register('vip')} value="vip" style={{ lineHeight: '32px' }}>
                                                VIP
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox {...register('carPark')} value="carPark" style={{ lineHeight: '32px' }}>
                                                Car Park
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox {...register('breakfast')} value="breakfast" style={{ lineHeight: '32px' }}>
                                                Breakfast
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox {...register('lunch')} value="lunch" style={{ lineHeight: '32px' }}>
                                                Lunch
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox {...register('spa')} value="spa" style={{ lineHeight: '32px' }}>
                                                Spa
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <input type="file" onChange={handleChange} />
                            <button onClick={handleUpload}>Upload</button>

                            <Row justify="center">
                                <Col >
                                    <Form.Item >
                                        <Button style={{ marginRight: 16 }} htmlType="button" onClick={onReset}>
                                            Reset
                                        </Button>
                                        <Button size="large" type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        {url}
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>

            {/* <form id="add-room-form" className="form-Rooms" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>Description: </label>
                    <input {...register('description')}></input>
                </div>

                <div className="field">
                    <label>Nº Adults: </label>
                    <input {...register('nAdult')}></input>
                </div>

                <div className="field">
                    <label>Nº Children: </label>
                    <input {...register('nChild')}></input>
                </div>

                <div className="field">
                    <label>Nº Rooms: </label>
                    <input {...register('nRoom')}></input>
                </div>

                <div className="field">
                    <label>Price: </label>
                    <input {...register('price')}></input>
                </div>

                <div className="field">
                    <label>Tags: </label>

                    <br></br>

                    <label>Type Room: </label>
                    <select {...register('typeRoom')}>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Quarto">Quarto</option>
                        <option value="Casa de Férias">Casa de Férias</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Casa de Campo">Casa de Campo</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <br></br>

                    <label>Vip: </label>
                    <select {...register('vip')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Nº Pool: </label>
                    <input {...register('nPool')}></input>

                    <br></br>

                    <label>Car Park: </label>
                    <select {...register('carPark')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>BreakFast: </label>
                    <select {...register('breakfast')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Lunch: </label>
                    <select {...register('lunch')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Spa: </label>
                    <select {...register('spa')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Nº Stars: </label>
                    <select {...register('nStars')}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <br></br>

                    <label>Nº Single Bed: </label>
                    <input {...register('nSingleBed')}></input>

                    <br></br>

                    <label>Nº Double Bed: </label>
                    <input {...register('nDoubleBed')}></input>
                </div>


                <input className="submit" type="submit"></input>
            </form> */}


            {/* <div className="field">
                    <label>Image: </label>
                    <input id="" name="" type="file" onChange={this.handleSelectedFile} {...register('image')}></input>
                    <button onClick={this.handleUpload}>Upload</button>
                    <div> {Math.round(this.state.loaded, 2)} %</div>
                </div> */}
        </div>
    );
}


export default RoomsForm;