import { QUERY_NAME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React from 'react'
import MessageWindow from '../components/MessageWindow'
import TextBar from '../components/TextBar'
import { registerOnMessageCallback, send } from '../websocket'


// const SingleUser = () => {  
export class SingleUser extends React.Component {
// const { userId } = useParams();
// const { loading: nameLoading, data: nameData } = useQuery(QUERY_NAME, { variables: { _id: userId}});
// const name = nameData?.getName || {};

state = {
  messages: [],
  fullName: null
}

constructor (props) {
    super(props)
    // The onMessageReceived method is registered as the callback 
    // with the imported `registerOnMessageCallback`
    // Everytime a new message is received, `onMessageReceived` will
    // get called
    registerOnMessageCallback(this.onMessageReceived.bind(this))
  }

  onMessageReceived (msg) {
    // Once we receive a message, we will parse the message payload
    // Add it to our existing list of messages, and set the state
    // with the new list of messages
    msg = JSON.parse(msg)
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  // This is a helper method used to set the fullName
  setfullName (name) {
    this.setState({
      fullName: name
    })
  }

  // This method accepts the message text
  // It then constructs the message object, stringifies it
  // and sends the string to the server using the `send` function
  // imported from the websockets package
  sendMessage (text) {
    const message = {
      fullName: this.state.fullName,
      text: text
    }
    send(JSON.stringify(message))
  }

  render () {
    // Create functions by binding the methods to the instance
    const setfullName = this.setfullName.bind(this)
    const sendMessage = this.sendMessage.bind(this)

    // If the fullName isn't set yet, we display just the textbar
    // along with a hint to set your fullName. Once the text is entered
    // the `setfullName` method adds the fullName to the state
    if (this.state.fullName === null) {
      return (
        <div className='container'>
          <div className='container-title'>Enter Name</div>
          <TextBar onSend={setfullName} />
        </div>
      )
    }

    // If the fullName is already set, we display the message window with
    // the text bar under it. The `messages` prop is set as the states current list of messages
    // the `fullName` prop is set as the states current fullName
    // The `onSend` prop of the TextBar is bound to the `sendMessage` method
    return (
      <div className='container'>
        <div className='container-title'>Messages</div>
        <MessageWindow messages={this.state.messages} fullName={this.state.fullName} />
        <TextBar onSend={sendMessage} />
      </div>
    )
  }

    // return (
    //     <div>
    //         <h1>{name.fullName}'s Chatroom</h1>
    //     </div>
        
    // )
    }  

export default SingleUser;
