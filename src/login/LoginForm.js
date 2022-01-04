import './LoginForm.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Col, Row, Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const LoginForm = () => {

    const { register, handleSubmit } = useForm();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const onSubmit = data => login(data);

    const login = (data) => {
        fetch('/auth/admin/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then(r => r.json())

            .then((response) => {
                console.log(response);

                if (response.auth) {
                    window.location.href = '/'
                    setLoginSuccess(true);

                } else {
                    alert('login errado');
                }
            })

            .catch((err) => {
                console.error('error: ', err);
            });
    }




    // if (loginSuccess) { 
    //     return <Navigate to='/' />
    // }


    return (
        <div>
            <Row style={{ paddingTop: 120 }}>
                <Col span={8}></Col>
                <Col span={8}>
                    <Row justify="center">
                        <div className="site-card-border-less-wrapper">
                            <Card className="card" title={<Row justify='center'><h2 style={{ color: '#405fad', marginBottom: 0 }}><b>SIGN IN</b></h2></Row>} bordered={true} style={{ width: 450 }}>
                                <Form layout='vertical' onFinish={onSubmit}>
                                    <Form.Item name="name" label={<h4 style={{ color: '#405fad' }}><b>Username</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]} >
                                        <Input prefix={<UserOutlined />} placeholder='Username' required />
                                    </Form.Item>
                                    <Form.Item name="password" label={<h4 style={{ color: '#405fad' }}><b>Password</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}>
                                        <Input.Password prefix={<LockOutlined />} placeholder='Password' required />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item>
                                            <Row justify='start' style={{ marginTop: -20 }}>
                                                <Checkbox> Remember Me</Checkbox>
                                            </Row>
                                            <Row justify='end' style={{ marginTop: -20 }}>
                                                <Link to='/'>Forgot your password?</Link>
                                            </Row>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: -40 }} t>
                                        <Button size='large' block type='primary' htmlType='submit'> Login </Button>
                                    </Form.Item>

                                    <Row justify='center' style={{ marginTop: -15, marginBottom: -30 }}>
                                        <Form.Item>
                                            <Link to='/register'>Don't Have an Account? Sign Up!</Link>
                                        </Form.Item>
                                    </Row>
                                </Form>

                                {/* <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                                    <div className='field'>
                                        <label>Name: </label>
                                        <input {...register('name')}></input>
                                    </div>

                                    <div className='field'>
                                        <label>Password: </label>
                                        <input {...register('password')} type='password'></input>
                                    </div>

                                    <input className='submit' type='submit'></input>
                                </form> */}
                            </Card>
                        </div>
                    </Row>
                </Col>
                <Col span={8}></Col>
            </Row >
        </div >
    )
}

export default LoginForm;