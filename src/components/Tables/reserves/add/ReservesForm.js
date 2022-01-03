import { useForm } from "react-hook-form";
import './ReservesForm.css';
import Config from "../../../../config";
import { Form, Button, Checkbox, Input, Select, Row, Col, Upload, message, DatePicker } from "antd";


const ReservesForm = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => postReserve(buildReserves(data));
    const [reserveForm] = Form.useForm();

    const { RangePicker } = DatePicker;


    const postReserve = (data) => {
        fetch('/reserve/reserves', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    alert("Reserve created");
                    return response.json();

                } else {
                    console.log(response);
                    alert("Reserve duplicate");
                }
            })

            .catch((err) => {
                console.error('Error: ', err);
            });
    }


    const buildReserves = (data) => {
        return { ...data }
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



    return (
        /*  <div>
             <Row justify="center">
                 <Col>
                     <h2>Add Reserve Form</h2>
                 </Col>
             </Row>
             <Row>
                 <Col span={8}></Col>
                 <Col span={8}>
                     <div>
                         <Form form={reserveForm} onSubmit={handleSubmit(onSubmit)}>
                             <Form.Item name="user" label="Id User:">
                                 <Input {...register('idUser')} />
                             </Form.Item>
                             <Form.Item name="room" label="Id Room:">
                                 <Input {...register('idRoom')} />
                             </Form.Item>
                             <Form.Item name="dateCheckInOut" label="Date Check In / Out">
                                 <RangePicker
                                     format="DD-MM-YYYY"
                                     onChange={onChange}
                                     onOk={onOk}
                                 />
                             </Form.Item>
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
                     </div>
                 </Col>
                 <Col span={8}></Col>
             </Row> */


        <form className="form-Reserves" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label>Date Check In: </label>
                <input {...register('dateCheckIn')}></input>
            </div>

            <div className="field">
                <label>Date Check Out: </label>
                <input {...register('dateCheckOut')}></input>
            </div>

            <div className="field">
                <label>ID User: </label>
                <input {...register('idUser')}></input>
            </div>

            <div className="field">
                <label>Name User: </label>
                <input {...register('nameUser')}></input>
            </div>

            <div className="field">
                <label>ID Room: </label>
                <input {...register('idRoom')}></input>
            </div>

            <input className="submit" type="submit"></input>
        </form>
    );
}

export default ReservesForm;