import {Card, Accordion, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {useState} from 'react'
import { useParams } from 'react-router';
import '../../styles/card.css'
import TaskResult from '../TaskResult'
import LineChart from '../charts/LineCharts'
const key = new Date().getTime();
const constants = require('../../constants');

const CustomCard = ({data, titleIndex}) => {
  const [hide, setHide] = useState('Show');
  const [results, setResults] = useState();
  const {module, env} = useParams();

  const renderTooltip = (title) => (
    <Tooltip id="button-tooltip">
      {title}
    </Tooltip>
  );

  const getNum = (number) => {
    if (isNaN(number)) {
      return 0;
    }
    return number;
  }

  const getResult = (title) => {
    fetch(constants.API_ENDPOINT + '/bstack/api/name/results?module=' + module + '&env=' + env + '&name=' + title)
    .then(response => response.json())
    .then(output => {
      let chartData = [];
      output.builds.forEach(build => {
        let json = {};
        json['build_no'] = build;
        if(output.tasks[build] !== undefined){
          output.tasks[build].forEach(result => {
            if (result.results[0] && result.results[0].count){
              json['date'] = result.results[0].date.split('T')[0]
              json['total'] = json['total'] ? json['total'] + getNum(result.results[0].count.total) : getNum(result.results[0].count.total);
              json['serious'] = json['serious'] ? json['serious'] + getNum(result.results[0].count.serious) : getNum(result.results[0].count.serious);
              json['critical'] = json['critical'] ? json['critical'] + getNum(result.results[0].count.critical) : getNum(result.results[0].count.critical);
              json['moderate'] = json['moderate'] ? json['moderate'] + getNum(result.results[0].count.moderate) : getNum(result.results[0].count.moderate);
              json['minor'] = json['minor'] ? json['minor'] + getNum(result.results[0].count.minor) : getNum(result.results[0].count.minor);
            }
          })
          if (json['total'])
            chartData.push(json);
        }
      })
      setResults(chartData);
    })
  };

  const clickHandler = (title) => {
    setHide(hide === 'Show' ? 'Hide' : 'Show')
    if(hide === 'Show'){
      getResult(title)
    }else{
      setResults('')
    }
  }

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          {titleIndex} - {data.name} ({data.url}) (Issues - {data.results[0] ? data.results[0].count.total : ''})
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <span>URL -  
              <a href={data.url}>{data.url}</a>
            </span>
            <OverlayTrigger
                  placement="bottom-start"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip('Last 5 build Results')}
            >
              <Button key= {key} className='insights' variant="outline-dark" 
                    type="submit" onClick={() => clickHandler(data.name)}>{hide} Insights</Button>
            </OverlayTrigger>
            {!results ? '' : <LineChart data={results} />}
            <br/>
            <br/>
            {(data.results[0] && data.results[0].results[0]) ? <TaskResult results={data.results[0].results[0]} />: ''}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default CustomCard;
