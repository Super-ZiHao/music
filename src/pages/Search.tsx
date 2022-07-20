import { IconAlbum, IconMusice1, IconSongSheet } from "@/components/Icons";
import { SearchMenuKeys } from "@/types";
import Icon, { UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const Search: React.FC<Props> = () => {
  const items: MenuProps["items"] = [
    {
      label: "歌曲",
      key: SearchMenuKeys.MUSIC_MENU,
      icon: <Icon component={IconMusice1} />,
    },
    {
      label: "专辑",
      key: SearchMenuKeys.ALBUM_MENU,
      icon: <Icon component={IconAlbum} />,
    },
    {
      label: "歌手",
      key: SearchMenuKeys.SINGER_MENU,
      icon: <UserOutlined />,
    },
    {
      label: "歌单",
      key: SearchMenuKeys.SONGSHEET_MENU,
      icon: (
        <Icon component={IconSongSheet} style={{ width: 16, height: 16 }} />
      ),
    },
  ];
  const [current, setCurrent] = useState<SearchMenuKeys>(
    SearchMenuKeys.MUSIC_MENU
  );
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key as SearchMenuKeys);
  };
  // 云烟成雨 id 513360721
  return (
    <div className="h-full">
      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
      />
      {current === SearchMenuKeys.MUSIC_MENU && <div>音乐</div>}
      {current === SearchMenuKeys.ALBUM_MENU && <div>专辑</div>}
      {current === SearchMenuKeys.SINGER_MENU && <div>歌单</div>}
      {current === SearchMenuKeys.SONGSHEET_MENU && <div>歌手</div>}
    </div>
  );
};

export default Search;
