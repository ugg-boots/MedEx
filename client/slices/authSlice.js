import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

const initialState = {
  userId: '',
  username: '',
  loginError: ''

}

export const validateUser = createAsyncThunk(
  'auth/login', 
  async(body,thunkAPI) => {
    try {
      const postedBody = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json());
      return postedBody;
    }
    catch(err) {
      console.log('AuthSlice login ERROR: ', err);
      if(!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
      resetLoginError: (state) => {
          state.loginError = '';
      }
    
  }, 

  extraReducers:  {
    [validateUser.fulfilled] : (state,action) => {
        if(typeof(action.payload) === 'object') {
            state.username = action.payload.username;
            state.userId = action.payload.id;
        }
        else state.loginError = action.payload;
    },
  }
})

export const { resetLoginError } = authSlice.actions;

export default authSlice.reducer;