import React, {  PropTypes } from 'react';

const Typing = () => {

  const { username } = this.props;
  return (
    <span>
      {username}
    </span>
  );
}

Typing.proptypes = {
  username: PropTypes.string.isRequired
}

export default Typing;