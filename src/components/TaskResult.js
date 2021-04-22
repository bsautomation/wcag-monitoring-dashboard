import {Tabs, Tab, Sonnet, Container, Card, OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import '../styles/card.css'
const time = new Date().getTime();

const TaskResult = ({results}) => {
  const [key, setKey] = useState('serious');
  const [hide, setHide] = useState('Show');

  const renderTooltip = (title) => (
    <Tooltip id="button-tooltip">
      {title}
    </Tooltip>
  );

  const showSelectors = (event) => {
    setHide(hide !== 'Hide' ? 'Hide' : 'Show')
  }

  useEffect(()=>{
    document.title = "Wcag monitoring Tool"
  },[])

  return (
    <Container fluid>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      >
        {Object.keys(results).map((key, index)=>(
          <Tab key={index} eventKey={key} title={key + '(' + results[key].length + ')'}>
            <br/>
            {results[key].map((result, index)=>(
              <Card>
                <OverlayTrigger
                  placement="bottom-start"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(result.nodes.length + ' selector(s)')}
                >
                  <Card.Header className={key}>{result.id + ' (' + result.nodes.length + ')' }</Card.Header>
                </OverlayTrigger>
                <Card.Body>
                  <Card.Title>{result.help}</Card.Title>
                  <Card.Text>
                    {result.description}&nbsp;
                    <Card.Link href={result.helpUrl} target='_blank'>Help Link</Card.Link>
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Selector(s): <Button variant="link" onClick={showSelectors}>{hide} Details</Button></Card.Subtitle>
                  <div className={hide !== 'Hide' ? 'hidden selectors' : 'selectors'}>
                    {result.nodes.map((node, index)=>(
                      <OverlayTrigger
                        placement="bottom-start"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(node.failureSummary)}
                      >
                        <p key={time}>Location - <code className='code' key={index}>{node.html}</code>&nbsp;
                        Source - <code className='code' key={index}>{node.target}</code>
                        </p> 
                      </OverlayTrigger>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}

export default TaskResult