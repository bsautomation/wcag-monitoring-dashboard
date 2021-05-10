import {Container, Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import '../../styles/Task.css'

const TaskForm = ({submitAction, view, data}) => {

  const [validated, setValidated] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      var json = {};
      for(let i =0; i < event.target.length; i++) {
        if (!event.target[i].name) { continue; }
        json[event.target[i].name] = event.target[i].value
      }
      submitAction(event);
    }

    setValidated(true);
  };

  const checkVisibility = () => {
    if (view === 'view' && data){
      setDisable(true)
    }else if (view === 'edit' && data){
      setEditable(true);
    }
  }

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
    checkVisibility();
  },[])

  return (
    <Container fluid>
      <Form noValidate validated={validated} className='newtask' onSubmit={handleSubmit}>
        <Form.Group controlId="module">
          <Form.Label>Module:</Form.Label>
          <Form.Control type="text" placeholder="Enter Module Name" name='module' readOnly={disable} defaultValue={data ? data.module : ''} required/>
          <Form.Control.Feedback type="invalid">
            Please enter Module
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="env">
          <Form.Label>Env Name</Form.Label>
          <Form.Control type="text" placeholder="prod" name='env' readOnly={disable} defaultValue={data ? data.env : ''} required/>
          <Form.Control.Feedback type="invalid">
            Please enter Env
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Sign-in page" name='name' readOnly={disable} defaultValue={data ? data.name : ''} required/>
          <Form.Control.Feedback type="invalid">
            Please enter Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="E.g https://www.browserstack.com" name='url' readOnly={disable} defaultValue={data ? data.url : ''} required/>
          <Form.Control.Feedback type="invalid">
            Please enter URL
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="standard">
          <Form.Label>Standard</Form.Label>
          {disable ? <Form.Control type="text" name='standard' readOnly defaultValue={data.standard}/> : 
          <Form.Control as="select" name='standard' readOnly={disable}>
            <option value='WCAG2AA'>WCAG2AA</option>
            <option value='WCAG2A'>WCAG2A</option>
          </Form.Control>}
        </Form.Group>
        <Form.Group controlId="timeout">
          <Form.Label>Timeout (milliseconds)</Form.Label>
          <Form.Control type="text" placeholder="E.g 30000" name='timeout' readOnly={disable} defaultValue={data ? data.timeout : ''} />
        </Form.Group>
        <Form.Group controlId="actions">
          <Form.Label>Task actions<a href='https://github.com/pa11y/pa11y#actions'> (see Pa11y documentation)</a></Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="E.g click element #login-button" name='actions' readOnly={disable} defaultValue={data ? data.actions : ''} />
        </Form.Group>
        {disable || editable ? '' : <Button variant="primary" type="submit"> Add Page </Button>}
        {!editable ? '' : <Button variant="primary" type="submit"> Save Changes </Button>}
      </Form>
    </Container>
  )
}

export default TaskForm