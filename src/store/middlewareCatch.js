
import store from './store'
import { logoutAccount } from '../app/modules/Auth/redux/authSlice'

// lỗi chung thì viết trong middleware
export const middlewareError = (api) => (next) => (action) => {
  
    // console.log('middleware action',action)
    if(action.payload && typeof action.payload ==="object" && 'errors' in action.payload &&  action.payload.errors.find((ac) => ac.code === 1805)){
      //1805 expried
        store.dispatch(logoutAccount())
    }
   


  return next(action)
}