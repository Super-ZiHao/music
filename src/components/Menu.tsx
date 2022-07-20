import React from "react";
import Icon from "@ant-design/icons";
import { IconCollection, IconList, IconMusice, IconRankingList } from "./Icons";

type Props = {};

const Menu: React.FC<Props> = () => {
  return (
    <div className="menu">
      <div className="flex justify-center">
        <Icon
          className="icon"
          component={IconMusice}
          style={{ width: 28, height: 28 }}
        />
      </div>
      <div className="flex justify-center">
        <Icon
          className="icon"
          component={IconList}
          style={{ width: 28, height: 28 }}
        />
      </div>
      <div className="flex justify-center">
        <Icon
          className="icon"
          component={IconCollection}
          style={{ width: 28, height: 28 }}
        />
      </div>
      <div className="flex justify-center">
        <Icon
          className="icon"
          component={IconRankingList}
          style={{ width: 28, height: 28 }}
        />
      </div>
    </div>
  );
};

export default Menu;
