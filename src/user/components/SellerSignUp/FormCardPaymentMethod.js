import { memo } from "react";
import { CardPaymentMethod } from "../../../shared/FormElement";

const FormCardPaymentMethod = () => {
  return (
    <div className="row">
      <div className="col-6">
        <CardPaymentMethod
          fieldName="cod"
          imgSrc={"https://www.coolmate.me/images/COD.svg"}
          title="Cash On Delivery"
          subTitle="Payment when received your order"
          multiple
        />
      </div>
      <div className="col-6">
        <CardPaymentMethod
          fieldName="paypal"
          imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
          title="Payment With Paypal"
          multiple
        />
      </div>
    </div>
  );
};

export default memo(FormCardPaymentMethod);
