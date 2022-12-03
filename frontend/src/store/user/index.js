import services from '../../services';


const initialState = {
  profile: null,
  loading: false
}

export const USER_SING_IN = 'user/singIn';
export const USER_CHANGE_SING_IN_LOADING = 'user/userChangeSingInLoading';
export const USER_DING_OUT = 'user/changeSurname';

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SING_IN:
      return { ...state, profile: action.payload }
    case USER_DING_OUT:
      return { ...state, profile: null }
    case USER_CHANGE_SING_IN_LOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const singIn = (data) => {
  return dispatch => {
    dispatch({ type: USER_CHANGE_SING_IN_LOADING, payload: true });
    return services.singIn(data)
      .then((response) => {
        const { profile } = response?.data;
        dispatch({
          type: USER_SING_IN,
          payload: profile
        })
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

export { singIn };

export default userReducer;
