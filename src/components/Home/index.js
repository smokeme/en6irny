import React, { Component } from "react";
import { ImageBackground,  } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Left,
  Right,
  Body,
  Spinner,
  List,
  Text,
} from "native-base";
import Footer from '../Footer';
import {  Link } from 'react-router-native'
import styles from "./styles";
import { itemsOrderData,removeListError,setOrder } from '../../actions/listsActions';
import { removeUser } from '../../actions/userActions';


const glow2 = require("../../../assets/glow2.png");

class Home extends Component {
  componentWillMount() {
    this.props.dispatch(itemsOrderData({token: this.props.token}));
  }
  componentDidUpdate(){
    if(this.props.errorFetching){
      this.props.dispatch(removeUser());
      this.props.dispatch(removeListError());

    }
  }
  render() {
      return (
        <Container>
          <ImageBackground source={glow2} style={styles.containerImage}>
            <Header>
              <Left>
              </Left>
              <Body>
                <Title>Home</Title>
              </Body>
              <Right />
            </Header>

            <Content padder>
              <List
                dataArray={this.props.items}
                renderRow={(
                  data, x, index // eslint-disable-line
                ) =>
                  <Link to='/orderDetail' component={ListItem} icon style={styles.listitem} onPress={() => this.props.dispatch(setOrder(data))}>
                    <Left>
                    <Text>
                        #{Number(index) + 1 }
                      </Text>
                      </Left>
                    <Body>
                      <Text>
                        From:
                      </Text>
                      <Text note>
                        {data.from_address.area}
                      </Text>
                    </Body>
                    <Body>
                      <Text>
                        To:
                      </Text>
                      <Text note >
                      {data.to_address.area}
                      </Text>
                    </Body>

                  </Link>}
              />
            </Content>
            <Footer />
          </ImageBackground>
        </Container>
      );
    }
  
}

const mapStateToProps = state => ({
  user: state.user,
  items: state.lists.orders,
  orderLoaded: state.lists.orderLoaded,
  errorFetching: state.lists.errorFetching,
  token: state.user.token
});
export default connect(mapStateToProps)(Home);
