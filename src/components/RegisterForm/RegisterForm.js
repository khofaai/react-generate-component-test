import React from 'react';

/* jshint ignore:start */
class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        email: '',
        password: '',
        customComponent: props.customComponent
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
          try {
            const user = {
              email: this.state.email,
              password: this.state.password
            }
          } catch (e) {
            console.log("fields are undefined");
          }
        }
    });
  }

  

  render() {

    const { getFieldDecorator } = this.props.form;
    const customComponent = this.state.customComponent({
      redirect: this.state.redirect,
      email: this.state.email,
      password: this.state.password,
      handleClick: this.handleClick.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
    });
    return (
      {customComponent}
    );
  }
}
  RegisterForm.defaultProps = {
    backendPath: `http://localhost:8081/register`,
    customComponent: null
  }
  const WrappedLoginForm = Form.create({ name: 'normal_login' })(RegisterForm);

  export default WrappedLoginForm;