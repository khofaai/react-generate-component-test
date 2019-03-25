import React from 'react';

/* jshint ignore:start */
class ReactCustomComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signup: true,
      redirect: false,
      email: '',
      password: '',
      customComponent: props.customComponent
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.setState({
      redirect: this.state.signup ? false : true
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err) => {
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

export default ReactCustomComponent;