import { MainPageSeller } from "../";

import { MainComponentSeller } from "../../components";
import { MyAds } from "../../components";

const MyAdsPage = () => {
  return (
    <MainPageSeller>
      <MainComponentSeller>
        <MyAds />
      </MainComponentSeller>
    </MainPageSeller>
  );
};

export default MyAdsPage;
