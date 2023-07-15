import './App.css'
import styled from 'styled-components'
import { Form } from './components/Form';

function App() {

  return (
    <>
      <Container>
        <Form />
      </Container>
    </>
  )
}

const Container = styled.div`
  max-width: 1024px;
  margin: 0px auto;
  height: 100vh;
`;

export default App
