import './App.css';
import { Container } from '@mui/material';

//import files here
import Home from "./Pages/Home/Home";

function App(props) {
  return (
    <Container maxWidth="false" disableGutters={true}>
      <Home/>
    </Container>
  );
}

export default App;
