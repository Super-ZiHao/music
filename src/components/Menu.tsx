import React from "react";
import Icon from "@ant-design/icons";
import { IconCollection, IconList, IconMusice, IconRankingList } from "./Icons";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Menu: React.FC<Props> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pushPath = (path: string) => {
    navigate(path, {
      replace: true
    })
  }
  return (
    <div className="menu">
      <div className="flex justify-center">
        <Icon
          className={`icon ${location.pathname === '/' ? 'active' : ''}`}
          component={IconMusice}
          style={{ width: 28, height: 28 }}
          onClick={() => pushPath('/')}
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
          className={`icon ${location.pathname === '/ranking-list' ? 'active' : ''}`}
          component={IconRankingList}
          style={{ width: 28, height: 28 }}
          onClick={() => pushPath('/ranking-list')}
        />
      </div>
    </div>
  );
};

export default Menu;
