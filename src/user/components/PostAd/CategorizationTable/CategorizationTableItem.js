import React from "react";

import { useDispatch, useSelector } from "react-redux";
import classes from './CategorizationTable.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { handleIncreaseFormNum } from "../../../../redux/slices/seller/product-categorization/productCategorizationSlice";

const CategorizationTableItem = () => {
    const dispatch = useDispatch();
    const productCategorizationState = useSelector(
        (state) => state.productCategorization
    );
    return <>
        {Array.from({ length: productCategorizationState.formNumbers }).map((_, i, arr) => (
            <React.Fragment key={i}>
                <div className={`${classes.categorizationTableBody}`}>
                    <div className={classes.categorizationTableBody__item}>
                        <input
                            // onChange={handleOnChangeColorValue}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Example: Red, White, ..."
                            type="text"
                        />
                    </div>

                    {productCategorizationState.sizeName && <div className={classes.categorizationTableBody__item}>
                        <input
                            // onChange={(e) => dispatch(handleOnChangeColorName(e.target.value))}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Example: S, L, XL ..."
                            type="text"
                        />
                    </div>}

                    <div className={classes.categorizationTableBody__item}>
                        <input
                            // onChange={(e) => dispatch(handleOnChangeColorName(e.target.value))}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Enter price (*)"
                            type="text"
                        />
                    </div>
                    <div className={classes.categorizationTableBody__item}>
                        <input
                            // onChange={(e) => dispatch(handleOnChangeColorName(e.target.value))}
                            className={`${classes.categorizationTable__input} form-input__input`}
                            placeholder="Enter Quantity (*)"
                            type="text"
                        />
                    </div>
                </div>

                {i === arr.length - 1 && (
                    <div
                        onClick={() => dispatch(handleIncreaseFormNum())}
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

export default CategorizationTableItem;