import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Slices/loginSlice'

export default configureStore({
  reducer: {
    "loginSlice": loginSlice,
  }
})
