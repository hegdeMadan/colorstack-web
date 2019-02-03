const initState = {}

const likeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LIKE':
          return state

    case 'CREATE_LIKE_ERROR':
          return state

    default:
          return state

  }
}

export default likeReducer
