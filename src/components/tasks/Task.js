import {Container, Spinner, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import '../../styles/home.css'
import '../../styles/card.css'
import Header from '../Header'
import Card from '../container/card'
const constants = require('../../constants');

const Task = ({loaded}) => {

  const [Loaded, setLoaded] = useState(loaded);
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
          <h3>Results for {module} module in build no - {build_no}</h3>
          <a href={constants.API_ENDPOINT + '/bstack/api/build.csv?module=' + module + '&env=' + env + '&build_no=' + build_no}><Button className='download-csv' variant="outline-info">Download CSV </Button></a>
          {data.map((tasks, index)=>(
            <Card key={index} data={tasks} titleIndex={index+1}/>
          ))}
      </Container>
    )
  }
}

export default Task