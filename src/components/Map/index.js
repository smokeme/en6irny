import React from 'react';
import { MapView } from 'expo';
import { View, Image,Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Content, Header , Footer } from 'native-base'
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class App extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
      placeholder='Enter Location'
      minLength={2}
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyAjm0wlxQciJ5m1n1nDnLstIA1HdYJfjQ0',
        language: 'en', // language of the results
        types: 'geocode' // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
      }}
      currentLocation={false}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      console.log(data, details);
    }}
    />
    );
  }
}