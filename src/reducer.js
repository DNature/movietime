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
    case "SET_CURRENT_MOVIE":
      return {
        ...state,
        currentMovie: {...action.payload}
      }
    default:
      return state;
  }
};
