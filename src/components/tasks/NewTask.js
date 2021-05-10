import {Container} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import Header from '../Header'
import TaskForm from '../Form/Form'
import '../../styles/Task.css'
const constants = require('../../constants');

const NewTask = ({results}) => {

  const [validated, setValidated] = useState(false);
  const [taskId, setTaskId] = useState();

  const addTask = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(constants.API_ENDPOINT + '/tasks', requestOptions)
        .then(response => response.json())
        .then(data => {
          setTaskId(data.id);
          window.location.href = '/view/' + data.id + '?action=added';
        })
        .catch(error => console.log(error))
  }

  const submitAction = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      var json = {};
      for(let i =0; i < event.target.length; i++) {
        if (!event.target[i].name) { continue; }
        json[event.target[i].name] = event.target[i].value
      }
      addTask(json);
    }

    setValidated(true);
  };

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
  },[])

  return (
    <Container fluid>
      <Header/>
      <h3>Add New Task</h3>
      <TaskForm submitAction={submitAction} />
    </Container>
  )
}

export default NewTask;