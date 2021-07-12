import React from 'react';
import { Menu } from 'semantic-ui-react';
// import panelImage from '../../assets/white-bg-mc-logo.jpeg';

const SidePanel = () => {
  return (
    <>
      <Menu vertical size="massive">
        <Menu.Item>
          <Menu.Header>Apparel</Menu.Header>
          <Menu.Menu>
            <Menu.Item name="shirts" />
            <Menu.Item name="hats" />
            <Menu.Item name="socks" />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Apparel</Menu.Header>
          <Menu.Menu>
            <Menu.Item name="shirts" />
            <Menu.Item name="hats" />
            <Menu.Item name="socks" />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SidePanel;
