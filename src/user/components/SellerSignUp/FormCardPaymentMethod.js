import { memo, useCallback } from "react";
import { CardPaymentMethod } from "../../../shared/FormElement";

import { useDispatch } from "react-redux";
import { handleChangePaymentMethod } from "../../../redux/slices/seller/add-product/addProductSlice";

const FormCardPaymentMethod = () => {
  const dispatch = useDispatch();
  const handleCheckboxChange = useCallback((name, checked) => {
    dispatch(handleChangePaymentMethod({ name, checked }));
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-6">
        <CardPaymentMethod
          fieldName="cod"
          imgSrc={"https://www.coolmate.me/images/COD.svg"}
          title="Cash On Delivery"
          subTitle="Payment when received your order"
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className="col-6">
        <CardPaymentMethod
          fieldName="paypal"
          imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
          title="Payment With Paypal"
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default memo(FormCardPaymentMethod);
