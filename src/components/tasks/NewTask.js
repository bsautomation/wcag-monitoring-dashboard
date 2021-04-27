import {Container, Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import Header from '../Header'
import '../../styles/card.css'
const time = new Date().getTime();

const TaskResult = ({results}) => {

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
  },[])

  return (
    <Container fluid>
      <Header/>
      <h3>Add New Task</h3>
      <Form>
        <Form.Group controlId="formModule">
          <Form.Label>Module:</Form.Label>
          <Form.Control type="text" placeholder="Enter Module Name" />
        </Form.Group>
        <Form.Group controlId="formEnv">
          <Form.Label>Env Name</Form.Label>
          <Form.Control type="text" placeholder="prod" />
        </Form.Group>
        <Form.Group controlId="formBuild">
          <Form.Label>Build No</Form.Label>
          <Form.Control type="text" placeholder="prod" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default TaskResult