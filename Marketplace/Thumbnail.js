import React, { Component } from 'react';
import Style from './Style.js';
import { View, Text, ScrollView, FlatList, TouchableHighlight, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { connect } from 'react-redux';
import Api from 'services/api/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from 'react-native';
import Config from 'src/config.js';
import Currency from 'services/Currency.js';
import Installment from './Installment.js';
const height = Math.round(Dimensions.get('window').height);
class Thumbnail extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      isLoading: false,
      data: null
    }
  }

  render() {
    const { item } = this.props;
    return (
      <View style={[Style.MainContainer]}>
        {
          item.featured != null && item.featured[0].url != null && (
            <View style={Style.imageHolder}>
              <Image
                source={{uri: Config.BACKEND_URL  + item.featured[0].url}}
                style={Style.imageThumbnail}/>
            </View>
          )
        }
        {
          (item.featured == null || (item.featured != null && item.featured[0].url == null)) && (
            <View style={Style.iconThumbnailStyle}>
              <FontAwesomeIcon
                icon={faImage}
                size={Style.iconThumbnail}
              />
            </View>
          )
        }

        <View style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5
        }}>
          <Text style={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: Color.primary
          }}
          numberOfLines={1}
            >
            {
              item.price.length === 1 ? Currency.display(item.price[0].price, item.price[0].currency) :
              item.price[0].currency + ' ' + item.price[item.price.length - 1].price + '-' + item.price[0].price
            }
          </Text>

          <Text style={{
            fontWeight: 'bold',
            width: '100%'
          }}
            numberOfLines={1}
          >{item.title}</Text>
          
          {
            item.installment != null && (
              <Installment data={item}/>
            )
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thumbnail);