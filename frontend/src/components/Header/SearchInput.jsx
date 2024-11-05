import React from 'react'
import { Container, Row, Col, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaBell, FaSearch } from 'react-icons/fa'

const SearchInput = () => {
    return (
        <Container fluid className="p-3" style={{ backgroundColor: 'white' }}>
            <Row className="align-items-center"  >
                <Col md="auto">
                    <Form inline >
                        <InputGroup >
                            <InputGroup.Text style={{ border: "none" }}>
                                <FaSearch style={{ border: "none" }} />
                            </InputGroup.Text>
                            <FormControl type="text" placeholder="Search Here" style={{ background: "#F6F8FB", borderRadius: "8px", border: "none" }} />
                        </InputGroup>
                    </Form>
                </Col>

                <Col></Col>

                <Col></Col>

                <Col></Col>

                <Col></Col>

                <Col className="text-center" style={{ cursor: "pointer", color: "#ee6a42" }}>
                    <InputGroup className='d-flex' >
                        <InputGroup.Text >
                            <FaBell style={{ fontSize: "20px", }} />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>

                <Col >
                <div className='d-flex'>
                <img
                src="https://via.placeholder.com/30" // Replace with actual profile image URL
                alt="profile"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
                    <h5 style={{fontWeight: "bold"}}>Moni Roy</h5>
                    <span>Admin</span>
                </div>
                    
             
                </Col>

               

        

            </Row>
        </Container>

    )
}

export default SearchInput
