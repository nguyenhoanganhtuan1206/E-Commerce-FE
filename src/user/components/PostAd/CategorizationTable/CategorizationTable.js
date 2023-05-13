import React from "react";
import classes from "./CategorizationTable.module.scss";

import { useSelector } from "react-redux";
import CategorizationTableItem from "./CategorizationTableItem";

const CategorizationTable = () => {
    const productCategorizationState = useSelector(
        (state) => state.productCategorization
    );

    return (
        <div className={classes.categorizationTable}>
            <div className={`${classes.categorizationTableHeader}`}>
                <div className={`${classes.categorizationTableHeader__item} font-weight-bold`}>
                    {productCategorizationState.colorName ? productCategorizationState.colorName : "Categorization 1"}
                </div>

                {productCategorizationState.isShowFormSize && <div className={`${classes.categorizationTableHeader__item} font-weight-bold`}>
                    {productCategorizationState.sizeName ? productCategorizationState.sizeName : "Categorization 2"}
                </div>}

                <div className={classes.categorizationTableHeader__item}>Quantity (*)</div>
                <div className={classes.categorizationTableHeader__item}>Price (*)</div>
            </div>

            <CategorizationTableItem />
        </div>
    );
};

export default CategorizationTable;
