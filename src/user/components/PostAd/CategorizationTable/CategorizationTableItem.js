import React, { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import classes from './CategorizationTable.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
    addInventoryForm,
    removeInventoryForm,
    updateInventory
} from "../../../../redux/slices/seller/inventory/inventorySlice";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const CategorizationTableItem = () => {
    const dispatch = useDispatch();
    const productCategorizationState = useSelector(
        (state) => state.productCategorization
    );
    const inventoryState = useSelector((state) => state.inventory);

    return <>
        {inventoryState.inventories.map((inventory, index, arr) => (
            <React.Fragment key={index}>
                <div className={`${classes.categorizationTableBody}`}>
                    <div className={classes.categorizationTableBody__item}>
                        <input
                            onChange={e => dispatch(updateInventory({
                                index,
                                field: "colorValue",
                                value: e.target.value,
                                colorName: productCategorizationState.colorName,
                                sizeName: productCategorizationState.sizeName,
                            }))}
                            value={inventory.colorValue}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Example: Red, White, ..."
                            type="text"
                        />
                    </div>

                    {productCategorizationState.isShowFormSize && <div className={classes.categorizationTableBody__item}>
                        <input
                            onChange={e => dispatch(updateInventory({
                                index,
                                field: "sizeValue",
                                value: e.target.value,
                                colorName: productCategorizationState.colorName,
                                sizeName: productCategorizationState.sizeName,
                            }))}
                            value={inventory.sizeValue}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Example: S, L, XL ..."
                            type="text"
                        />
                    </div>}

                    <div className={classes.categorizationTableBody__item}>
                        <input
                            onChange={e => dispatch(updateInventory({
                                index,
                                field: "quantity",
                                value: e.target.value,
                                colorName: productCategorizationState.colorName,
                                sizeName: productCategorizationState.sizeName,
                            }))}
                            value={inventory.quantity}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Enter quantity (*)"
                            type="number"
                        />
                    </div>
                    <div className={classes.categorizationTableBody__item}>
                        <input
                            onChange={e => dispatch(updateInventory({
                                index,
                                field: "price",
                                value: e.target.value,
                                colorName: productCategorizationState.colorName,
                                sizeName: productCategorizationState.sizeName,
                            }))}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Enter price (*)"
                            value={inventory.price}
                            type="number"
                        />
                    </div>

                    <div
                        style={{ width: "150px" }}
                        className={classes.categorizationTableBody__item}
                    >
                        {index !== 0 &&
                            <FontAwesomeIcon
                                onClick={() => dispatch(removeInventoryForm(inventory))}
                                className={classes.categorizationTable__icon}
                                icon={faTrashAlt}
                            />
                        }
                    </div>
                </div>

                {index === arr.length - 1 && (
                    <div
                        onClick={() => dispatch(addInventoryForm({
                            colorName: "",
                            colorValue: "",
                            sizeName: "",
                            sizeValue: "",
                            quantity: 0,
                            price: 0
                        }))}
                        className={`${classes.categorizationTableAddMore}`}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={classes.categorizationTableAddMore__icon}
                        />
                        Add more
                    </div>
                )}
            </React.Fragment>
        ))}
    </>
}

export default memo(CategorizationTableItem);