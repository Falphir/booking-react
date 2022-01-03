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
            ...data, image: url, tags: [
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
                        <form id="add-room-form" className="form-Rooms" onSubmit={handleSubmit(onSubmit)}>
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

                            <label>{url}</label>
                            <input type="file" onChange={handleChange} />
                            <button>Upload</button>


                            <input className="submit" type="submit" onClick={handleUpload}></input>
                        </form>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    );
}


export default RoomsForm;