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
    isDuplicateColorValue: false,
    isDuplicateSizeValue: false,
  },
  reducers: {
    addInventoryForm: (state, action) => {
      state.inventories.push(action.payload);
    },
    updateInventory: (state, action) => {
      const { index, field, value, colorName, sizeName } = action.payload;
      state.inventories[index].colorName = colorName;
      state.inventories[index].sizeName = sizeName;

      const valueFormatted = value.trim().toLowerCase();
      for (const inventory of state.inventories) {
        if (inventory.colorValue.trim().toLowerCase() === valueFormatted) {
          state.isDuplicateColorValue = true;
          break;
        } else {
          state.isDuplicateColorValue = false;
        }
      }

      for (const inventory of state.inventories) {
        if (inventory.sizeValue.trim().toLowerCase() === valueFormatted) {
          state.isDuplicateSizeValue = true;
          break;
        } else {
          state.isDuplicateSizeValue = false;
        }
      }
      /* Update data to array */
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
    updateInventories: (state, action) => {
      state.inventories = action.payload.map((inventory) => ({
        colorName: inventory.colorName || "",
        colorValue: inventory.colorValue || "",
        sizeName: inventory.sizeName || "",
        sizeValue: inventory.sizeValue || "",
        quantity: inventory.quantity || 0,
        price: inventory.price || 0,
      }));
    },
  },
});

export const {
  addInventoryForm,
  updateInventory,
  removeInventoryForm,
  updateStateFormInventory,
  resetInventoryForm,
  updateInventories,
} = inventorySlice.actions;
export const inventoryReducer = inventorySlice.reducer;
