import React from "react";
import { Icon, FooterTab, Button, Footer as FTab } from "native-base";
import styles from "./styles";
import { itemsOrderData } from '../../actions/listsActions';
import {connect} from 'react-redux';
import {  Link } from 'react-router-native'

class FooterTabNavigation extends React.Component {

    render() {
      return (
        <FTab>
          <FooterTab style={styles.footer}>
            <Link component={Button} to='/selection'>
              <Icon name="calendar" style={{ color: "#fff" }} />
            </Link>
            <Link component={Button} to='/'>
              <Icon name="add-circle" style={{ color: "#fff" }} />
              </Link>
            <Button onPress={() => this.props.dispatch(itemsOrderData({token: this.props.token}))}>
              <Icon name="ios-refresh-circle" style={{ color: "#fff" }} />
            </Button>
          </FooterTab>
        </FTab>
      );
    }
}

function mapStateToProps(store) {
    return {
        token: store.user.token,
    };
}
export default connect(mapStateToProps)(FooterTabNavigation);
