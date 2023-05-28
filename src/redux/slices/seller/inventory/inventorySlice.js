import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventories: [
      {
        id: null,
        colorName: "",
        colorValue: "",
        sizeName: "",
        sizeValue: "",
        quantity: 0,
        price: 0,
      },
    ],
    isDuplicate: false,
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

      const newColorValue = state.inventories[index].colorValue
        .trim()
        .toLowerCase();
      const newSizeValue = state.inventories[index].sizeValue
        .trim()
        .toLowerCase();

      // Check for duplicates
      state.isDuplicate = state.inventories.some((inventory, i) => {
        if (i !== index) {
          return (
            inventory.colorValue.trim().toLowerCase() === newColorValue &&
            inventory.sizeValue.trim().toLowerCase() === newSizeValue
          );
        }
        return false;
      });
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
        id: inventory.id || "",
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
