export const createStore = (store) => {
    return(dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore =  getFirestore()
        const ownerId = getState().firebase.auth
        const profile = getState().firebase.profile

        firestore.collection('stores')
        .add({
            ...store,
            ownerId
        })
        .then(_ => {
            window.location.href="/"
            
        })
    }
}