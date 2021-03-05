import React from 'react';

import {Button,Container,Nav,NavDropdown,Form,FormControl,Navbar,Image} from 'react-bootstrap';
import {RiMessengerLine} from 'react-icons/ri';
import {AiOutlineHome,AiOutlineCompass,AiOutlineHeart,AiOutlineSearch} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';


const NaviBar = () => {

    function redirectToHome(){
        window.location.pathname = '/'
    }

    return (
        <div className="border">
            <Container>
                <Navbar bg="white" expand="lg" sticky="top" >
                    <Navbar.Brand href="">
                        <div onClick={redirectToHome} ><Image src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" /></div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href=""><h3><AiOutlineHome/></h3></Nav.Link>
                            <Nav.Link href=""><h3><RiMessengerLine/></h3></Nav.Link>
                            <Nav.Link href=""><h3><AiOutlineCompass/></h3></Nav.Link>
                            <Nav.Link href=""><h3><AiOutlineHeart/></h3></Nav.Link>
                            <Nav.Link href="http://localhost:3000/login"><h3><CgProfile/></h3></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
};

export default NaviBar;
