import {Container} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header'
import TaskForm from '../Form/Form'
const constants = require('../../constants');

const EditTask = ({results}) => {

  const [data, setData] = useState();
  const {taskId} = useParams();

  const getTask = () => {

    fetch(constants.API_ENDPOINT + '/tasks/' + taskId)
        .then(response => response.json())
        .then(data => setData(data));
  }

  const editTask = (data) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(constants.API_ENDPOINT + '/tasks/' + taskId, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          window.location.href = '/view/' + taskId + '?action=edited';
        })
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
      editTask(json);
    }

  };

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
    getTask();
  },[])

  return (
    <Container fluid>
      <Header/>
      <h3>Task Details</h3>
      {data ? <TaskForm view='edit' data={data} submitAction={submitAction} /> : ''}
    </Container>
  )
}

export default EditTask