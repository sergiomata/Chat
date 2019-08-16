import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageList extends  React.Component {

    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrolltoBottom = node.scrollTop + node.clientHeight +100 >= node.scrollHeight
    }

    componentDidUpdate(){
        const node = ReactDOM.findDomNode(this)
        node.scrollTop = node.scrollHeight
    }

    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} username ={message.senderId} text ={message.parts[0].payload.content}/>
                    )
                })}
            </div>
        );
    }
}

export default MessageList;
