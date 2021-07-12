import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoaderComponent = () => {
  return (
    <>
      <Dimmer active inverted>
        <Loader size="large" inverted>
          Loading
        </Loader>
      </Dimmer>
    </>
  );
};

export default LoaderComponent;
