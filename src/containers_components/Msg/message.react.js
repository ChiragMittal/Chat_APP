import React, { PropTypes } from 'react';

class Message extends React.Component {

    render(){
        const {message} = this.props;
  return (
        <li>
            <span>
            {message.user.username}
            </span>
            <div>
            {message.text}
            <p>{message.time}</p>
            </div>
        </li>
  );
        
    }

}

Message.proptypes = {
    message: PropTypes.string.isRequired,

  }

export default Message;