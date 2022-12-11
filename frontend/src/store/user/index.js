import services from '../../services';

const initialState = {
  profile: null,
  loading: false,
  singUpLoading: false,
  getProfileLoading: false,
}

export const USER_SING_IN = 'user/singIn';
export const USER_SING_UP = 'user/singUp';
export const USER_GET_PROFILE = 'user/getProfile';
export const USER_UPDATE_PROFILE = 'user/updateProfile';
export const USER_CHANGE_GET_PROFILE_LOADING = 'user/userChangeGetProfileLoading';
export const USER_CHANGE_SING_IN_LOADING = 'user/userChangeSingInLoading';
export const USER_CHANGE_SING_UP_LOADING = 'user/userChangeSingUpLoading';
export const USER_SING_OUT = 'user/changeSurname';
export const RESET_PROFILE = 'user/resetProfile';

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SING_IN:
      return { ...state, profile: action.payload }
    case USER_CHANGE_SING_IN_LOADING:
      return { ...state, loading: action.payload }

    case USER_SING_UP:
      return { ...state, profile: action.payload }
    case USER_CHANGE_SING_UP_LOADING:
      return { ...state, singUpLoading: action.payload }

    case USER_GET_PROFILE:
      return { ...state, profile: action.payload }
    case USER_CHANGE_GET_PROFILE_LOADING:
      return { ...state, getProfileLoading: action.payload }

    case USER_UPDATE_PROFILE:
      return { ...state, profile: action.payload }

    case USER_SING_OUT:
      return { ...state, profile: null }

    case RESET_PROFILE:
      return initialState;

    default:
      return state
  }
}

const singIn = (data) => {
  return dispatch => {
    dispatch({ type: USER_CHANGE_SING_IN_LOADING, payload: true });
    return services.singIn(data)
      .then((response) => {
        const { profile, token } = response?.data;
        dispatch({
          type: USER_SING_IN,
          payload: profile
        })
        localStorage.setItem('access_token', token);
        return Promise.resolve(profile);
      })
      .catch((error) => {
        return Promise.reject(error)
      })
      .finally(() => {
        dispatch({ type: USER_CHANGE_SING_IN_LOADING, payload: false });
      })
  }
}

const singUp = (data) => {
  return dispatch => {
    dispatch({ type: USER_CHANGE_SING_UP_LOADING, payload: true });
    return services.singUp(data)
      .then((response) => {
        const { profile, token } = response?.data;
        dispatch({
          type: USER_SING_UP,
          payload: profile
        })
        localStorage.setItem('access_token', token);
        return Promise.resolve(profile);
      })
      .catch((error) => {
        return Promise.reject(error)
      })
      .finally(() => {
        dispatch({ type: USER_CHANGE_SING_UP_LOADING, payload: false });
      })
  }
}

const getProfile = () => {
  return dispatch => {
    dispatch({ type: USER_CHANGE_GET_PROFILE_LOADING, payload: true });
    return services.getProfile()
      .then((response) => {
        dispatch({
          type: USER_GET_PROFILE,
          payload: response?.data
        })
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error)
      })
      .finally(() => {
        dispatch({ type: USER_CHANGE_GET_PROFILE_LOADING, payload: false });
      })
  }
}

const updateProfile = (profileData) => {
  return dispatch => {
    return services.updateProfile(profileData)
      .then((response) => {
        dispatch({
          type: USER_UPDATE_PROFILE,
          payload: response?.data
        })
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

const resetProfile = () => ({
  type: RESET_PROFILE
})

export { singIn, singUp, getProfile, resetProfile, updateProfile };

export default userReducer;
