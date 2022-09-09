/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

import axios from 'axios';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#D2691E',
    fontSize: 19,
    borderRadius: 16,
  },

  infoView: {
    alignItems: 'center',
  },

  cityCountryText: {
    color: '#D2691E',
    fontSize: 40,
    fontWeight: 'bold',
  },

  dateText: {
    color: '#D2691E',
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
  },

  tempText: {
    fontSize: 40,
    color: '#D2691E',
    marginVertical: 10,
  },

  minMaxText: {
    fontSize: 22,
    color: '#D2691E',
    marginVertical: 10,
    fontWeight: '500',
  },
});

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: '486a7dceff36934a00e8daaa99a9630e',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };
  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        setData(res.data);
      })
      .catch(e => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/bg2.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="Escreva o nome da cidade!"
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp,
            )} °C`}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min,
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default App;
