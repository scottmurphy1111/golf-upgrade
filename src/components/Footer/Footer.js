import React from 'react';
import { Segment } from 'semantic-ui-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Segment>
      Copyright &copy; {year} Maple Chase Golf &amp; Country Club
    </Segment>
  );
};

export default Footer;
