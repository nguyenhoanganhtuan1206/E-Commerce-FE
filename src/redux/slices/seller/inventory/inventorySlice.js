import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventories: [
      {
        colorName: "",
        colorValue: "",
        sizeName: "",
        sizeValue: "",
        quantity: 0,
        price: 0,
      },
    ],
  },
  reducers: {
    addInventoryForm: (state, action) => {
      state.inventories.push(action.payload);
    },
    updateInventory: (state, action) => {
      const { index, field, value, colorName, sizeName } = action.payload;
      state.inventories[index].colorName = colorName;
      state.inventories[index].sizeName = sizeName;
      state.inventories[index][field] = value;
    },
    removeInventoryForm: (state, action) => {
      state.inventories.splice(action.payload, 1);
    },
    resetInventoryForm: (state) => {
      state.inventories = [
        {
          colorName: "",
          colorValue: "",
          sizeName: "",
          sizeValue: "",
          quantity: 0,
          price: 0,
        },
      ];
    },
  },
});

export const {
  addInventoryForm,
  updateInventory,
  removeInventoryForm,
  updateStateFormInventory,
  resetInventoryForm,
} = inventorySlice.actions;
export const inventoryReducer = inventorySlice.reducer;
