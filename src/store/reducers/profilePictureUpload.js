const profilePictureUpload = (state = {}, action) => {
  switch (action.type) {
    case 'UPLOAD_PROFILE_PICTURE':
      return state

    case 'UPLOAD_PROFILE_PICTURE_ERROR':
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}

export default profilePictureUpload
