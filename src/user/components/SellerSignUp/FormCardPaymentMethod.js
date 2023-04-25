import { memo, useEffect } from "react";
import { CardPaymentMethod } from "../../../shared/FormElement";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangePaymentMethod,
  setCheckedPaymentMethod,
} from "../../../redux/slices/seller/sellerSlice";

const FormCardPaymentMethod = () => {
  const dispatch = useDispatch();
  const sellerState = useSelector((state) => state.seller);

  const handleCheckboxChange = (name, checked) => {
    dispatch(handleChangePaymentMethod({ name, checked }));
  };

  useEffect(() => {
    const setCheckedIfPaymentMethodExisted = (namePaymentMethod) => {
      if (sellerState.data) {
        const paymentMethod = sellerState.data.paymentMethods.find(
          (paymentMethod) => paymentMethod.name === namePaymentMethod
        );

        if (paymentMethod) {
          dispatch(setCheckedPaymentMethod(namePaymentMethod));
        }
      }
    };

    setCheckedIfPaymentMethodExisted("COD");
    setCheckedIfPaymentMethodExisted("Paypal");
  }, [dispatch, sellerState.data]);

  return (
    <div className="row">
      <div className="col-6">
        <CardPaymentMethod
          fieldName="cod"
          initialValue={sellerState.paymentMethods.some(
            (value) => value.name === "COD"
          )}
          imgSrc={"https://www.coolmate.me/images/COD.svg"}
          title="Cash On Delivery"
          subTitle="Payment when received your order"
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className="col-6">
        <CardPaymentMethod
          fieldName="paypal"
          initialValue={sellerState.paymentMethods.some(
            (value) => value.name === "Paypal"
          )}
          imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
          title="Payment With Paypal"
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default memo(FormCardPaymentMethod);
