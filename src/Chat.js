import  NewMessage from "./NewMessage";
import ShowMessages from './ShowMessages';
import { authProvider } from "./firebase";


function Chat() {


  return (
    <>
      <h1>Chat {authProvider.displayName}</h1>
      <NewMessage></NewMessage>
      <ShowMessages></ShowMessages>
      

    </>
  );
}

export default Chat;