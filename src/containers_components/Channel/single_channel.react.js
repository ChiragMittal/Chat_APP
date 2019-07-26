import React, { PropTypes } from 'react';

const Single_list = (props) => {
    const {  onClick, channel } = props;
    <a className='singleChannel'
         style={{ cursor: 'hand', color: 'white'}}
         onClick={() => onClick(channel)}>
        <li>
          <h5>{channel.name}</h5>
        </li>
      </a>
}

Single_list.propTypes = {
    channel: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }
  
  export default Single_list;
