import {Container, Button, Alert, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '../Header'
import TaskResult from '../TaskResult'
import CustomAlert from '../Alert/Alert'
import ResultChart from '../charts/ResultChart'
const constants = require('../../constants');
const PAGE_ADDITION = 'Page has been added. Now you can run your test on this page';
const PAGE_EDIT = 'Changed saved. Please continue running the test.';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const ViewTask = () => {
  
  const [Loaded, setLoaded] = useState(false);
  const [data, setData] = useState();
  const [result, setResult] = useState();
  const [chartdata, setChartdata] = useState();
  const [message, setMessage] = useState();
  const {taskId} = useParams();
  const params = useQuery();

  const getTask = () => {

    fetch(constants.API_ENDPOINT + '/tasks/' + taskId)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setLoaded(true)
        });
  }

  const getResult = () => {
    setLoaded(false);
    fetch(constants.API_ENDPOINT + '/tasks/' + taskId + '/results?full=true')
        .then(response => response.json())
        .then(resultdata => {
          setResult(resultdata);
          let chartData = [];
          for(let i=0 ; i < resultdata.length; i++) {
            let res = resultdata[i];
            let existing = 0;
            if (chartData.length > 0){
              existing = chartData.filter(node => node.date.split('T')[0] === res.date.split('T')[0]).length
            }
            if(existing === 0) {
              let json = res.count;
              json['date'] = res.date.split('T')[0];
              chartData.push(json)
            }
          }
          setChartdata(chartData);
          setLoaded(true)
        });
  }

  const runTest =() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    setLoaded(false)
    fetch(constants.API_ENDPOINT + '/tasks/' + taskId + '/run', requestOptions)
        .then(response => {
          setLoaded(true)
          window.location.href = '/view/' + data.id;
        })
  }

  const deleteTask =() => {
    const requestOptions = {
      method: 'DELETE'
    };

    fetch(constants.API_ENDPOINT + '/tasks/' + taskId, requestOptions)
        .then(response => {
          setMessage('Task ' + taskId + ' deleted successfully.')
          setData('')
          setResult('')
          setChartdata('')
        })
  }

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
    getTask();
    if (params.get('action') !== 'added'){
      getResult();
    }
  },[])

  return (
    <Container fluid>
      <Header/>
      {params.get('action') === 'added' ? 
        <CustomAlert varient='success' classname='notification' message={PAGE_ADDITION} /> : '' }
      {params.get('action') === 'edited' ? 
        <CustomAlert varient='success' classname='notification' message={PAGE_EDIT} dismissible='true'/> : '' }
      {message ? 
        <CustomAlert varient='danger' classname='notification' message={message}/> : '' }
      <section className='task_details'>
        {!data ?  <CustomAlert varient='danger' classname='notification' message='No Task present'/>: 
          <div>
            <h4>{data.name}</h4>
            <a href={data.url}>{data.url}</a><span> ({data.standard})</span>
            <br/>
            <Link to={'/edit/' + taskId}>Edit Task</Link> | 
            <Button variant="link" style={{color: '#007bff'}} onClick={deleteTask}>Delete Task</Button> | 
            <Button variant="link" style={{color: '#007bff'}} onClick={runTest}>Run Test</Button> |
            {result && result[0] ? <span> Last Run : {result[0].date.split('T')[0]}</span> : <span>No Run</span>}
          </div>
        }
      {!Loaded ? <Spinner animation="border" style={{ marginLeft: "50%"}} /> : ''}
      {chartdata ? <ResultChart data={chartdata} /> : ''}
      {result && result[0] ? <TaskResult results={result[0].results[0]} /> : '' }
      {data && !result && !message ? 
        <Alert variant="info">
          <Alert.Heading>There are no results to show</Alert.Heading>
          <p>
            axe Results has not been run against this URL yet so there are no results to show.
          </p>
          <Button variant="link" onClick={runTest}>Run Test on this URL</Button>
        </Alert> : ''}
      </section> 
    </Container>
  )
}

export default ViewTask