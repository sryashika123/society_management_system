import React from 'react'
import { Container, Row, Col, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'

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
            </Row>
        </Container>

    )
}

export default SearchInput
