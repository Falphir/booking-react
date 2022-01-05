import './LoginForm.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Col, Row, Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import logo from '../assets/logo/logo_simples.png'

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


    //remember me
    const rmCheck = document.getElementById("rememberMe"), usernameInput = document.getElementById("username"), passwordInput = document.getElementById("password");

    if (localStorage.checkbox && localStorage.checkbox != "") {

        rmCheck.setAttribute("checked", "checked");
        usernameInput.value = localStorage.username;
        passwordInput.value = localStorage.password;

    } else {

        rmCheck.removeAttribute("checked");
        usernameInput.value = "";
        passwordInput.value = "";
    }


    function lsRememberMe() {

        if (rmCheck.checked && usernameInput.value !== "" && passwordInput.value != "") {

            localStorage.username = usernameInput.value;
            localStorage.password = passwordInput.value;
            localStorage.checkbox = rmCheck.value;

        } else {

            localStorage.username = "";
            localStorage.password = "";
            localStorage.checkbox = "";
        }
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
                        <div >
                            <Card headStyle={{ backgroundColor: "#242424" }} bodyStyle={{ backgroundColor: "#242424" }} className="login-card" title={

                                <Row justify='center'>
                                    <Col>
                                        <div className='card-logo'>
                                            <img className='login-Logo' src={logo} />
                                        </div>
                                        <Row justify='center'>
                                            <h2 className='login-card-title-h2'>
                                                <b>SIGN IN</b>
                                            </h2>
                                        </Row>
                                    </Col>
                                </Row>}
                                bordered={false} style={{ width: 450 }}>

                                <Form layout='vertical' onFinish={onSubmit}>
                                    <Form.Item name="name" label={<h4 className='login-form-label-h4'><b>Username</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]} >
                                        <Input id="username" prefix={<UserOutlined />} placeholder='Username' required />
                                    </Form.Item>
                                    <Form.Item name="password" label={<h4 className='login-form-label-h4'><b>Password</b></h4>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}>
                                        <Input.Password id="password" prefix={<LockOutlined />} placeholder='Password' required />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item>
                                            <Row justify='start' style={{ marginTop: -20 }}>
                                                <Checkbox id="rememberMe" value={lsRememberMe} style={{ color: '#fff' }}> Remember Me</Checkbox>
                                            </Row>
                                            <Row justify='end' style={{ marginTop: -20 }}>
                                                <Link to='/' >Forgot your password?</Link>
                                            </Row>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: -40 }} t>
                                        <Button className='login-Button-Outlined' size='large' block value="Login" htmlType='submit' onClick={lsRememberMe()}> <b>Login</b> </Button>
                                    </Form.Item>

                                    <Row justify='center' style={{ marginTop: -15, marginBottom: -30 }}>
                                        <Form.Item>
                                            <div style={{ color: '#fff' }}>Don't Have an Account?<Link to='/register' > Sign Up!</Link></div>
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
                    </Row >
                </Col >
                <Col span={8}></Col>
            </Row >
        </div >
    )
}

export default LoginForm;