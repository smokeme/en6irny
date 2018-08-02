import React, { Component } from "react";
import { ImageBackground,Image, Platform, StatusBar, ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Spinner,
  Toast
} from "native-base";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import {connect} from 'react-redux';
import { fetchingUser , removeUserError} from '../../actions/userActions';
import Loader from '../Loader';

const commonColor = require("../../theme/variables/commonColor");
const backgroundImage = require("../../../assets/glow2.png");
const logo = require("../../../assets/en.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const username = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Invalid username"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

declare type Any = any;
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    }
  }
  textInput: Any;

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "username" ? "person" : "unlock"}
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="rgba(230,230,230,0.8)"
            style={styles.input}
            placeholder={input.name === "username" ? "Username" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  login() {
    if (this.props.valid) {
      let payload = {
        username: this.props.form.login.values.username,
        password: this.props.form.login.values.password 
      }
      this.props.dispatch(fetchingUser(payload))
    } else {
      Toast.show({
        text: "Enter Valid Username & Password!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor={
            Platform.OS === "android"
              ? commonColor.statusBarColor
              : "transparent"
          }
          barStyle="light-content"
        />
        <Content style={{ backgroundColor: commonColor.containerBackground }}>
          <ImageBackground source={backgroundImage} style={styles.containerImage}>
            <ImageBackground source={logo} style={styles.logoShadowImage}/>
              {this.props.fetching ? <Loader/> : null}
              <View style={styles.bgView}>
                <Field
                  name="username"
                  component={this.renderInput}
                  type="text"
                  validate={[username, required]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  type="password"
                  validate={[alphaNumeric, minLength8, maxLength15, required]}
                />
                <Button
                  light
                  rounded
                  block
                  style={{ marginBottom: 800 }}
                  onPress={() => this.login()}
                >
                  <Text style={{ color: commonColor.brandPrimary }}>Login</Text>
                </Button>
              </View>
            </ImageBackground>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(store) {
  return {
      fetching: store.user.fetching,
      error: store.user.errorUser,
      form: store.form,
  };
}
LoginForm = connect(mapStateToProps)(LoginForm)

const Login = reduxForm({
  form: "login"
})(LoginForm);
export default Login;
