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

                <Col className="text-center">
                    <InputGroup className='d-flex'>
                        <InputGroup.Text style={{ border: "none" }}>
                            <FaBell style={{  fontSize: "20px", }} />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </Container>

    )
}

export default SearchInput
