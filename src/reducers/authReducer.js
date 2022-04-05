const INTIAL_STATE = {
  isSignedIn: false,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      if (
        action.payload.Username === "admin" &&
        action.payload.password === "adminpass"
      ) {
        return { ...state, isSignedIn: true };
      } else {
        return { ...state, isSignedIn: false };
      }
    default:
      return state;
  }
};

export default authReducer;
