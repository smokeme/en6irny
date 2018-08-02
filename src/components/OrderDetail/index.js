import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Spinner,
  View,
  List
} from "native-base";
import {  Card, CardItem } from 'native-base';
import call from 'react-native-phone-call'
import Footer from '../Footer';
import {Link } from 'react-router-native'
import styles from "./styles";
import { itemsOrderData,removeListError,setOrder } from '../../actions/listsActions';
import { removeUser } from '../../actions/userActions';


const glow2 = require("../../../assets/glow2.png");

class OrderDetail extends Component {
  componentDidUpdate(){
    if(this.props.errorFetching){
      this.props.dispatch(removeUser());
      this.props.dispatch(removeListError());

    }
  }
  call(number){
    const args = {
      number: number.toString(), // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    
    call(args).catch(console.error)
  }
  render() {
      return (
        <Container>
          <ImageBackground source={glow2} style={styles.containerImage}>
            <Header>
              <Left>
                <Link component={Button} transparent to='/'>
                <Icon small active name='arrow-back'/>
                </Link>
              </Left>
              <Body>
                <Title>Order</Title>
              </Body>
              <Right />
            </Header>
            <Content padder style={{ paddingTop: 0 }}>
            <Card style={styles.card}>
            <View style={styles.cardView}>
                  <CardItem style={styles.cardHeader} header>
                    <Left>
                      <Icon small active name="car" />
                      <Body>
                        <Text style={{ fontWeight: "bold" }}>
                          {this.props.order.item}
                        </Text>
                        <Text note>
                        {this.props.order.status}
                        </Text>
                      </Body>
                    </Left>

                    <Right>
                      <Text note style={styles.date}>
                        {this.props.order.time.slice(0,10) + " "}
                        {this.props.order.time.slice(11,16)}
                      </Text>
                    </Right>
                  </CardItem>
                  <CardItem bordered style={styles.cardItem}>
                  <Left>
                    <Text style={{ color: "#ebeded", marginLeft: -30 }}>
                    Details:{"\n"}
                      Item: <Text note>{this.props.order.item}</Text>{"\n"}
                      Price: <Text note>{this.props.order.price}</Text>{"\n"}
                    </Text>
                  </Left>
                  <Right>
                  <Button primary onPress={ () => this.call(this.props.order.to_address.phone) } transparent>
                  <Icon style={{fontSize: 50}} name="hand" />
                  </Button>
                  </Right>
                  </CardItem>
                  <CardItem bordered style={styles.cardItem}>
                  <Left>
                  <Text style={{ color: "#ebeded", marginLeft: -30 }}>
                      From Address:{"\n"}
                      Area: <Text note>{this.props.order.from_address.area}</Text>{"\n"}
                      Block: <Text note>{this.props.order.from_address.block}</Text>{"\n"}
                      Street: <Text note>{this.props.order.from_address.street}</Text>{"\n"}
                      Building: <Text note>{this.props.order.from_address.building}</Text>{"\n"}
                      Avenu: <Text note>{this.props.order.from_address.avenu}</Text>{"\n"}
                      Floor: <Text note>{this.props.order.from_address.floor}</Text>{"\n"}
                      Phone: <Text note>{this.props.order.from_address.phone}</Text>{"\n"}

                    </Text>
                  </Left>
                  <Right>
                  <Button primary onPress={ () => this.call(this.props.order.from_address.phone) } transparent>
                  <Icon style={{fontSize: 50}} name="call" />
                  </Button>
                  </Right>
                  </CardItem>
                  <CardItem bordered style={styles.cardItem}>
                  <Left>
                    <Text style={{ color: "#ebeded", marginLeft: -30 }}>
                    To Address:{"\n"}
                      Area: <Text note>{this.props.order.to_address.area}</Text>{"\n"}
                      Block: <Text note>{this.props.order.to_address.block}</Text>{"\n"}
                      Street: <Text note>{this.props.order.to_address.street}</Text>{"\n"}
                      Building: <Text note>{this.props.order.to_address.building}</Text>{"\n"}
                      Avenu: <Text note>{this.props.order.to_address.avenu}</Text>{"\n"}
                      Floor: <Text note>{this.props.order.to_address.floor}</Text>{"\n"}
                      Phone: <Text note>{this.props.order.to_address.phone}</Text>{"\n"}

                    </Text>
                  </Left>
                  <Right>
                  <Button primary onPress={ () => this.call(this.props.order.to_address.phone) } transparent>
                  <Icon style={{fontSize: 50}} name="call" />
                  </Button>
                  </Right>
                  </CardItem>
                </View>
            </Card>

            </Content>
            <Footer />
          </ImageBackground>
        </Container>
      );
    }
  
}

const mapStateToProps = state => ({
  user: state.user,
  order: state.lists.currentOrder,
  token: state.user.token
});
export default connect(mapStateToProps)(OrderDetail);
