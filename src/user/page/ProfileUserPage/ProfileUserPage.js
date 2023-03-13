import { memo } from "react";
import "../MainContent.scss";

import {
  MainComponentUser,
  SettingPassword,
  UserInfoEditor,
} from "../../components";
import { Header } from "../../../shared/Layouts";
import { Breadcrumbs } from "../../../shared/components";

const ProfileUserPage = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Profile Settings" nextPages={["Home"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Profile Settings</h3>

          <div className="main-content--user__body">
            <UserInfoEditor />
          </div>
        </div>

        <div className="main-content--user mt-5">
          <h3 className="main-content--user__header">Change Password</h3>

          <div className="main-content--user__body">
            <SettingPassword />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(ProfileUserPage);
