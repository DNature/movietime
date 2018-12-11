export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        status: action.payload
      };
    case "FETCHED":
      return {
        ...state,
        status: action.payload
      };
    case "SET_TRAILER_LINK":
      return {
        ...state,
        trailerLink: action.payload
      };
    default:
      return state;
  }
};
