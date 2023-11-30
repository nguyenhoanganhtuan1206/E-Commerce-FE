import classes from "./TabsHeader.module.scss";

const TabsHeader = ({
  tabsHeaderList = [],
  onSwitchTab,
  currentTab,
  children,
}) => {
  return (
    <div className={classes.TabsHeader}>
      <ul className={classes.TabsHeaderList}>
        {tabsHeaderList.map(({ tab, label, badge }) => (
          <li
            key={tab}
            onClick={() => onSwitchTab(tab)}
            className={`${classes.TabsHeaderItem} ${
              currentTab === tab && classes.TabsHeaderItem__active
            }`}
          >
            {label}
            <span className={classes.TabsHeaderItem__badge}>{badge}</span>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
};

export default TabsHeader;
