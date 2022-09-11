


const initialState = {
  id: 1,
  name: 'Benik',
  surname: 'Khudinyan'
}

export const USER_CHANGE_NAME = 'user/changeName';
export const USER_CHANGE_SURNAME = 'user/changeSurname';

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_CHANGE_NAME:
      const { name } = action.payload;
      return { ...state, name }
    case USER_CHANGE_SURNAME:
      const { surname } = action.payload;
      return { ...state, surname }
    default:
      return state
  }
}

export default userReducer;
