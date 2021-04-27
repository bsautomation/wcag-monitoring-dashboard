import {Nav, Navbar} from 'react-bootstrap'
import Avatar from 'react-avatar';
import useToken from "./auth/useToken";
import '../styles/header.css'

const Header = () => {
  const creds = useToken();

  return (
    <Navbar className='header' collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/home">Wcag Monitoring Tool</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          {creds.image ? <Avatar src={creds.image} size="50" round={true} aria-label={creds.name} /> : <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue', 'black'])} name={creds.user} size="50" round={true} aria-label={creds.name}/> }
        </Nav>
      </Navbar.Collapse>
      <br/>
    </Navbar>
  )
}

export default Header
