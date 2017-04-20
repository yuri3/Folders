import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

const Loading = (props) => {
  const {size = 24, width = '36px', height = '36px'} = props;
  return (
    <div style={{...style.container, width, height}}>
      <RefreshIndicator
        size={size}
        left={0}
        top={0}
        status="loading"
        style={style.refresh}
      />
    </div>
  );
};

export default Loading;
