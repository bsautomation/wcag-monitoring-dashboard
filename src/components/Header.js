import {Nav, Navbar, NavDropdown} from 'react-bootstrap'

const Header = () => {

  return (
    <Navbar className='header' collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/home">Wcag Monitoring Tool</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <br/>
    </Navbar>
  )
}

export default Header
