import React from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({location}) => {
    const [name, setName] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [users, setUsers] = React.useState('');
    const [messages,setMessages] = React.useState([]);
    const ENDPOINT = 'https://react-node-chat-appp.herokuapp.com/';

    React.useEffect(() => {
        const {name,room} = queryString.parse(location.search);

        socket = io(ENDPOINT,{transports: ['websocket']});

        setName(name);
        setRoom(room);

        socket.emit('join', {name,room}, () => {});

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    },[ENDPOINT,location.search]);

    React.useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages,message]);

        })
    },[messages]);

    React.useEffect(() => {
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    },[])

    //function for sending message
    const sendMessage = (e) => {
        e.preventDefault();

        if(message){
            socket.emit('sendMessage',message,() => setMessage(''));
        }
    }

    //console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <TextContainer users={users} />
            </div>
        </div>
    )
}
export default Chat;