import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { variables } from './Variables';


export  class EditDepModal extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();
        fetch(variables.API_URL + 'department', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                departmentId:event.target.departmentId.value,
                departmentName:event.target.departmentName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error) =>{
            alert('Failed');
        })
    }
    render(){
        return(
            <div className="container">
                <Modal 
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="departmentId">
                                        <Form.Label>Department ID</Form.Label>
                                        <Form.Control type="text" name="departmentId" required 
                                        disabled
                                        defaultValue={this.props.depId}
                                        placeholder="department id"/>
                                    </Form.Group>
                                    <Form.Group controlId="departmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" name="departmentName" required
                                        defaultValue={this.props.depName}
                                        placeholder="department name"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Department
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
