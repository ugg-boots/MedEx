import { createSlice, createAsyncThunk,rejectWithValue } from '@reduxjs/toolkit';
import { fetchProducts } from './catalogSlices';
// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

export const fetchProductId = createAsyncThunk(
  'inventory/fetchProductId',
  async (id, thunkAPI) => {
    try{
      let fetchedData =  await fetch(`/api/inventory/query?product_id=${id}`).then((res) => res.json());
      // console.log("fetchProductId data ", fetchedData);
      if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
   catch(err) {
     console.log('InventorySlicer fetchProductId: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
  }
} 
);
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (userId, thunkAPI) => {
    try{
      let fetchedData =  await fetch(`/api/inventory/${userId}`).then((res) => res.json());
      console.log("fetchInventory data ", fetchedData);
      if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
   catch(err) {
     console.log('InventorySlicer fetchInventory: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
  }
} 
);



//posting data to database
export const postInventory = createAsyncThunk(
  'inventory/postInventory', 
  async(body,thunkAPI) => {
    try{
      const postedBody = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json());
        return postedBody.rows[0];
    }
    catch(err) {
      console.log('InventorySlicer postInventory: ERROR: ', err);
      if(!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
);

export const deleteInventory = createAsyncThunk(
  'inventory/deleteInventory',
  async(item_id, thunkApi) => {
    try {
      // console.log("in delete inventory ", item_id)
      const deleted = await fetch(`/api/inventory/${item_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON'
        },
      })
      .then(resp => resp.json());
      return deleted;
    }
    catch(err) {
      console.log('InventorySlicer deleteInventory: ERROR: ', err);
      if(!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
);
export const updateInventory = createAsyncThunk(
  'inventory/updateInventory',
  async(body, thunkApi) => {
    try {
      const updated = await fetch(`/api/inventory`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'Application/JSON'
        }
      })
      .then(resp => resp.json());
      return updated;
    }
    catch(err) {
      console.log('InventorySlicer updateInventory: ERROR: ', err);
      if(!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { 
    allProductNames: [],
    groupedInventory : {},
    allInventory: [],
    displayedInventory: [],
    isDeleteModalOpen: false,
    itemDeleted: {}
  },
  reducers: { 
    setModalOpen: (state, action) => {
      state.itemDeleted = action.payload;
      state.isDeleteModalOpen = true;
    },
    setModalClose: (state,action) =>{
      state.isDeleteModalOpen = false; 
    },
    getDeleteModal: (state,action) => {
      return state.isDeleteModalOpen;
    }
  },
  extraReducers: {
      [fetchProducts.fulfilled] : (state,action) => {
          // console.log("fetchProductName returned ",action.payload);
          action.payload.forEach((el) => {
            state.allProductNames.push(el.product_name);
          });
      },
      [fetchInventory.fulfilled] : (state,action) => {
        // console.log("fetchInventory returned ",action.payload);
        action.payload.forEach((el) => {
          if(state.groupedInventory.hasOwnProperty(el.product_id)) {
            state.groupedInventory[el.product_id].push(el);
          
          }
          else {
            state.groupedInventory[el.product_id]=[el];
          }
          state.allInventory.push(el);
        });

        for (const id in state.groupedInventory) {
          // console.log("in data displayed")
          const newInvent = {};
          newInvent.product_id = id;
          newInvent.quantity = 0;
          newInvent.product_name = state.groupedInventory[id][0].product_name;
          newInvent.metadata = [];
          // newInvent.expiratation_date = groupedInventory[id][0].expiration_date; 
          state.groupedInventory[id].forEach((el) => {
            newInvent.quantity += el.quantity;
            newInvent.metadata.push(el);
          })
          state.displayedInventory.push(newInvent);
        };
    },
    [postInventory.fulfilled] : (state,action) => {
      // console.log("postInventory fulfilled returned ",action.payload);
      const item = action.payload;
      let isItInDisplayed = false;
      state.allInventory.push(item);
      state.displayedInventory.forEach((el) => {
        //el.product_id is string while item's is a number
        if(+el.product_id === item.product_id) {
          el.quantity += item.quantity;
          el.metadata.push(item);
          isItInDisplayed = true;
        }
      });
      if(!isItInDisplayed) { 
        if(!state.groupedInventory[item.product_id]) {
          state.groupedInventory[item.product_id]=[item];
        }
        const newInvent = {};
        newInvent.product_id = item.product_id;
        newInvent.quantity = item.quantity;
        newInvent.product_name = item.product_name;
        newInvent.metadata = [item];
        state.displayedInventory.push(newInvent);
      }
      
    }, 
    [deleteInventory.fulfilled] : (state,action) => {
      const productId = action.payload.rows[0].product_id;
      const itemId = action.payload.rows[0].item_id;
      const newDisplay = []
      state.displayedInventory.forEach((el) => {
        if(+el.product_id !== productId) {
          newDisplay.push(el);
        }
        else {
          const metadata = [];
          let quantity = 0;
          el.metadata.forEach((item) => {
            if(+item.item_id !== itemId ){
              quantity += item.quantity; 
              metadata.push(item);
            }
          });
          el.metadata = [...metadata];
          el.quantity = quantity
          newDisplay.push(el)
        }
      });
      state.displayedInventory = [...newDisplay];
    },
    [updateInventory.fulfilled] : (state,action) => {
      const {product_id, quantity, item_id} = action.payload.rows[0];
      state.displayedInventory.forEach((el,ind) => {
        if(+el.product_id === product_id) {
          el.quantity = 0;
          el.metadata.forEach((item) => {
            if(+item.item_id === item_id) {
              item.quantity = quantity;
            }
            el.quantity += item.quantity
          });
        }
      })
    }
  }
});

export const {setModalClose,setModalOpen, getDeleteModal} = inventorySlice.actions; 
export default inventorySlice.reducer; 
