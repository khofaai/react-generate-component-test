import React from 'react';

import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
import RegisterForm from '../RegisterForm';
  /* jshint ignore:start */

class LoginForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
        redirect: false,
        forgot: false,
        signup: false,
        email_forgot: '',
        email: '',
        password: ''
    };
	
    console.log('reload ....')
  }

  handleForgotSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          forgot: false
      });

      console.log("handleForgotSubmit has passed, calling back end now");
      }
    });
  }

  handleSubmit (e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          try {
            const user = {
              email: this.state.email,
              password: this.state.password
            }
          } catch (e) {
            console.log("fields are undefined");
          }

          try {

          console.log("handleSubmit has passed, calling back end now");
          // axios.post(this.backendPath,  user )
          //  .then(res => {
          //     console.log(res);
          //     console.log(res.data);
      
          //     this.setState({
          //       email: '',
          //       password: '',
          //       redirect: true,
          //     });
          //    })
          } catch (e) {
            console.log("backend connection failed.");
          }
        }
    });
  }

  handleClick (e) {
    e.preventDefault();
    console.log('Forgot password :/ ?');
    if( this.state.forgot) {
      this.setState({
        forgot: false
      });
    } 
      else {
        this.setState({
          forgot: true
        });
      }
    };

  handleSignUpClick (e) {
    e.preventDefault();
    if( this.state.signup) {
      this.setState({
        signup: false
      });
    } 
    else {
      this.setState({
        signup: true
      });
    }
  }
    
  handleClickConfirm (e) {
    e.preventDefault();
    if( this.state.forgot) {
      this.setState({
        forgot: false
      });
    } 
    else {
      this.setState({
        forgot: true
      });
    }
          

  };

    render() {
      const { getFieldDecorator } = this.props.form;

      const redirect = this.state.redirect;
      const forgot = this.state.forgot;
      const signup = this.state.signup;

      if(redirect) {
        // add redirect ex: return <Redirect to="/welcome" />
    } else { 
        if (signup) {
          //add redirect ex: return <Redirect to="/login/register" />
          return (<RegisterForm />)
        } else {
        if (forgot) {
            //Forgot Password Form
            return (
              <Form name="form-forget" onSubmit={this.handleForgotSubmit} className="login-form-forgot">
                <Form.Item>
                  {getFieldDecorator('email_forgot', {
                    rules: [{ required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please input a valid email address !' }],
                  })(
                    <Input prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" onChange={(event) => this.setState({email_forgot:event.target.value} )}/>
                  )}
                </Form.Item>
                <Form.Item>
                  <a className="login-form-forgot" onClick={this.handleClick}>Cancel</a>
                  <Button type="primary" htmlType="submit" className="login-form-button"
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            );
        } else {
            //Login Form
            return (
              <Form id="form-login" name="form-login" onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={(event) => this.setState({email:event.target.value} )} />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={(event) => this.setState({password:event.target.value} )} />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Remember me</Checkbox>
                  )}
                  <a className="login-form-forgot" href="#" onClick={this.handleClick}>Forgot password</a>
                  <Button type="primary" htmlType="submit" className="login-form-button"
                  
                  >
                    Log in
                  </Button>
                </Form.Item>
                <Form.Item>
                  
                  <a className="login-form-forgot" href="#" onClick={this.handleSignUpClick}>Sign up</a>
                  
                </Form.Item>
              </Form>
            );
            }
          }
    }
  }
}
 LoginForm.defaultProps = {
  backendPath: 'http://localhost:8081/login'
 }
  const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
  export default WrappedLoginForm;
