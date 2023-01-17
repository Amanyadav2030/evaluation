import * as types from "./actionType";

const initialState = {
  userData: {},
  isLoading: false,
  isAuth: false,
  meetupsData: [],
  errorText:null
};

const reducer = (state = initialState,{type,payload}) => {
  switch (type) {
    case types.GET_EVENTS_LOADING:
      return { ...state, isLoading: true };

    case types.GET_EVENTS_SUCCESS:
      return { ...state, isLoading: false, meetupsData: payload };

    case types.GET_EVENTS_ERROR:
      return { ...state, isLoading: false, errorText: payload };

    case types.AUTH_LOGIN_LOADING:
      return { ...state, isLoading: true };
      
    case types.AUTH_LOGIN_SUCCESS:
      return { ...state, isLoading: false, userData: payload, isAuth: true };

    case types.AUTH_LOGIN_ERROR:
      return { ...state, isLoading: false, errorText: payload };

    case types.AUTH_REGISTER_LOADING:
      return { ...state, isLoading: true };
      
    case types.AUTH_REGISTER_SUCCESS:
      return { ...state, isLoading: false };

    case types.AUTH_REGISTER_ERROR:
      return { ...state, isLoading: false, errorText: payload };

    case "AUTH_LOGOUT":
      return { ...state, isAuth: false }

    default:
      return state;
  }

};

export { reducer };