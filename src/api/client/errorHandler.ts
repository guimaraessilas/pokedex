import { Alert } from 'react-native';

const errorHandler = (error: any, handleError: any) => {
  if (!handleError) {
    return Promise.reject(error);
  }

  if (error && error.message) {
    // console.log(
    //   'Houve um erro de comunicação com o servidor',
    //   'Verifique sua conexão e tente novamente mais tarde.'
    // );
  }
  return Promise.reject(error);
};

export default errorHandler;
