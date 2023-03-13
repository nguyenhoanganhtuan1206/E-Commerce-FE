import "./MyAdsUser.scss";

import { Table } from "../../../shared/components";
import { DUMMY_USERS } from "../../../data/dummy_data";

const header = ["ID", "Name", "AvaUrl"];

const MyAdsUser = (props) => {
  return <Table data={DUMMY_USERS} header={header} />;
};

export default MyAdsUser;
