import React, { PropTypes } from 'react';

class Message_Input extends React.Component {

    constructor(props){
        super(props);
      this.state = { 
          text='',
          typing=false
      };
    }

    onQueryChange = (e) =>{

        const {socket , user , activeChannel} = this.props;
        const text = e.target.value;
        this.setState({ 
            text:text,
        })

        if(text.length > 0){
            socket.emit('typing', { user: user.username, channel: activeChannel });
      this.setState({ typing: true});
        }

        if(text.length === 0){
            socket.emit('stop typing', { user: user.username, channel: activeChannel });
      this.setState({ typing: false});
        }
    }

    handleSubmit = (e) => {

        const {socket , user , activeChannel} = this.props;
        const text = e.target.value.trim();
        var button = e.keyCode || e.which;
        if (button === 13) {

            var newMsg = {
                id: `${Date.now()}${uuid.v4()}`,
                channelID: this.props.activeChannel,
                text: text,
                user: user,
                time: moment.utc().format('lll')
            }

            socket.emit('new message', newMessage);
      socket.emit('stop typing', { user: user.username, channel: activeChannel });
      this.setState({ text: '', typing: false });
      this.props.saveMsg(newMsg);
        }

    }

    render(){
        return (
            <div>
                <input 
                className="message__input" 
                type="text"
                placeholder="Type a message"
                value={this.state.text}
                onChange={this.onQueryChange}
                onKeyDown={this.handleSubmit}/>
            </div>
        );
    }
}

Message_Input.proptypes = {
    activeChannel: PropTypes.string.isRequired,
    user : PropTypes.string.isRequired,
    socket : PropTypes.string.isRequired,
    saveMsg : PropTypes.string.isRequired
  }

export default Message_Input;