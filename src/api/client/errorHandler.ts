import { Alert } from 'react-native';

const errorHandler = (error: any, handleError: any) => {
  if (!handleError) {
    return Promise.reject(error);
  }

  if (error.message) {
    Alert.alert(error.message);
  }
  return Promise.reject(error);
};

export default errorHandler;
