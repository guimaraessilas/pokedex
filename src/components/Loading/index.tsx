import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../../../assets/loading.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
