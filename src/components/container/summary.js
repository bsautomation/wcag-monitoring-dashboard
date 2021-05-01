import {Card, Button, CardColumns} from 'react-bootstrap';
import '../../styles/summary.css'

const Summary = ({data}) => {

  const getDetails = (event) => {
    console.log(event.target.value)
    window.location.href = '/view/' + event.target.value;
  }

  return (
    <CardColumns>
      {data.map((task, index) => (
        <Card className='page_name' style={{ width: '18rem' }} key={index}>
        <Card.Body>
          <Card.Title>{task.name}</Card.Title>
          <Card.Text>
            <Card
              bg='dark'
              key={index}
              style={{ width: '8rem' }}
              className="mb-2 total_issue"
            >
              <Card.Header>{task.last_result.count.total} Issues</Card.Header>
            </Card>
          </Card.Text>
          <Card.Text>
            Last Run - {task.last_result.date.split('T')[0]}
          </Card.Text>
          <Button className='details' variant="info" value={task.id} onClick={getDetails}>Details</Button>
        </Card.Body>
      </Card>
      ))}
    </CardColumns>
  )
}

export default Summary;