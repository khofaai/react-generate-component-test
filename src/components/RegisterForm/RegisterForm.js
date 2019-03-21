import React from 'react';
import axios from 'axios';
import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
import LoginForm from '../LoginForm';

  /* jshint ignore:start */
  class RegisterForm extends React.Component {

    constructor() {
      super();
      this.state = {
          redirect: false,
          email: '',
          password: '',
      };
      
      this.handleSubmit = this.handleSubmit.bind(this);
      console.log('reload ....')
  }

  handleClick(e) {
    e.preventDefault();
    if( this.state.signup) {
      this.setState({
        redirect: false
    });
    } else {
      this.setState({
        redirect: true
    });
    }
  }

  
  handleSubmit(e) {
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

  

    render() {

      const { getFieldDecorator } = this.props.form;

      const redirect = this.state.redirect;

      if(redirect) {
        //redirection ex: return <Redirect to="/login/login" />
          return <LoginForm />
      } else {
            //register Form
            return (
              <Form onSubmit={this.handleSubmit} className="login-form">
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
                  <a className="login-form-forgot" onClick={this.handleClick}>Cancel</a>
                  <Button type="primary" htmlType="submit" className="login-form-button"
                  
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            );
            
    }
  }
}
  RegisterForm.defaultProps = {
    backendPath: `http://localhost:8081/register`
  }
  const WrappedLoginForm = Form.create({ name: 'normal_login' })(RegisterForm);

  export default WrappedLoginForm;