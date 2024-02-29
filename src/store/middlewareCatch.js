
import store from './store'
import { logoutAccount } from '../app/view/Auth/redux/authSlice'

// lỗi chung thì viết trong middleware
export const middlewareError = (api) => (next) => (action) => {
  
    // console.log('middlewareError action',action)
    if(action.payload && typeof action.payload ==="object" && 'errors' in action.payload && typeof action.payload.errors ==="object" &&  action.payload.errors.find((ac) => ac.code === 1805)){
      //1805 expried
        store.dispatch(logoutAccount())
    }else{
      return next(action)

    }
   
}