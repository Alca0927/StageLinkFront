// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';

export default configureStore({
  reducer: {
    login: loginSlice,  // ✅ key 이름을 login 으로 변경
  },
});
