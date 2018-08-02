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
  List
} from "native-base";
import Footer from '../Footer';

import styles from "./styles.js";
import { itemsSelectionData } from '../../actions/listsActions';

const glow2 = require("../../../assets/glow2.png");

class Selection extends Component {
  componentDidMount() {
    this.props.dispatch(itemsSelectionData({token: this.props.token}));
  }
  render() {
      return (
        <Container>
          <ImageBackground source={glow2} style={styles.containerImage}>
            <Header>
              <Left>
              </Left>
              <Body>
                <Title>Selection</Title>
              </Body>
              <Right />
            </Header>

            <Content padder>
              <List
                dataArray={this.props.items}
                renderRow={(
                  data, index // eslint-disable-line
                ) =>
                  <ListItem icon style={styles.listitem}>
                    <Left>
                      <Icon active name="car" style={{ width: 30 }} />
                      <Text>{data.driver}</Text>
                    </Left>
                    <Body>
                      <Text>
                        {data.order.status}
                      </Text>
                    </Body>
                    <Right>
                      <Text style={{ fontWeight: "400", paddingTop: 18 }} note>
                        {data.accepted.slice(0,10) + " "}
                        <Text style={{ fontWeight: "300", paddingTop: 24 }} note>
                        {data.accepted.slice(11,16)}
                      </Text>
                      </Text>
                    </Right>
                  </ListItem>}
              />
            </Content>
            <Footer />
          </ImageBackground>
        </Container>
      );
    }
  
}

const mapStateToProps = state => ({
  items: state.lists.selections,
  selectionLoaded: state.lists.selectionLoaded,
  token: state.user.token
});
export default connect(mapStateToProps)(Selection);
