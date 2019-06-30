import fb from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebase = fb.initializeApp(firebaseConfig)
export default firebase
// export default firebaseApp.firestore()
