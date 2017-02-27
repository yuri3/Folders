import React from 'react';

const Notes = ({params}) => (
  <div style={{border: '1px solid red'}}>
    Notes of {params.folderId}
  </div>
);

export default Notes;
