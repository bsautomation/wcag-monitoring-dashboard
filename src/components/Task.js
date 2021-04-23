import {Container, Row, Spinner, Button, CardDeck} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import '../styles/home.css'
import '../styles/card.css'
import Header from './Header'
import Card from './container/card'
import $ from 'jquery';
const constants = require('../constants');

const Task = () => {

  const [Loaded, setLoaded] = useState();
  const [data, setData] = useState();
  const {module, env, build_no} = useParams();

  const getResult = () => {
    fetch(constants.API_ENDPOINT + '/bstack/api/build/tasks?module=' + module + '&env=' + env + '&build_no=' + build_no)
    .then(response => response.json())
    .then(data => {
      setData(data);
      setLoaded(true);
    })
  };

  const downloadCSV = () => {
    fetch(constants.API_ENDPOINT + '/bstack/api/build.csv?module=' + module + '&env=' + env + '&build_no=' + build_no)
  }

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
    getResult()
  },[])

  if (!Loaded){
      return (
        <Spinner animation="border" style={{ marginLeft: "50%"}} />
      )
  }else{
    return (
      <Container fluid>
        <Header />
          <a href={constants.API_ENDPOINT + '/bstack/api/build.csv?module=' + module + '&env=' + env + '&build_no=' + build_no}><Button className='download-csv' variant="outline-info">Download CSV </Button></a>
          {data.map((tasks, index)=>(
            <Card key={index} data={tasks} titleIndex={index+1}/>
          ))}
      </Container>
    )
  }
}

export default Task