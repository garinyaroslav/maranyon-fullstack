import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    plusItem: (state, action) => {
      const itemIndex = state.items.indexOf(state.items.find((item) => item.id === action.payload));

      state.items[itemIndex].count++;
    },
    minusItem: (state, action) => {
      const itemIndex = state.items.indexOf(state.items.find((item) => item.id === action.payload));

      if (state.items[itemIndex].count !== 1) state.items[itemIndex].count--;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.item.id)) return;
      console.log(action.payload);
      state.items.push({ ...action.payload.item, count: action.payload.itemCount });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    countPrice: (state) => {
      state.totalPrice = state.items.reduce((count, item) => count + item.price * item.count, 0);
    },
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setIsOpen, addItem, removeItem, countPrice, setItems, plusItem, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
