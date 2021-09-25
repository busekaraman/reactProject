import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { variables } from './Variables';


export  class EditEmpModal extends Component {
    constructor(props){
        super(props);
        this.state={deps:[]}
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        fetch(variables.API_URL+ 'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(variables.API_URL + 'employee', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                employeeId:event.target.employeeId.value,
                employeeName:event.target.employeeName.value, 
                department: event.target.department.value,
                dateOfJoining:event.target.dateOfJoining.value,
                photoFileName:event.target.photoFileName.value


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
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="employeeId">
                                        <Form.Label>Employee Id</Form.Label>
                                        <Form.Control type="text" name="employeeId" required 
                                        placeholder="employee id"
                                        disabled
                                        defaultValue={this.props.empId}/>
                                    </Form.Group>
                                    <Form.Group controlId="employeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control type="text" name="employeeName" required 
                                        placeholder="employee name"
                                        defaultValue={this.props.empName}/>
                                    </Form.Group>
                                    <Form.Group controlId="department">
                                        <Form.Label>department</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.department}>
                                            {this.state.deps.map(dep=>
                                                <option key={dep.departmentId}>{dep.departmentName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="dateOfJoining">
                                        <Form.Label>dateOfJoining</Form.Label>
                                        <Form.Control 
                                        type="date" name="dateOfJoining" required 
                                        placeholder="dateofJoining"
                                        defaultValue={this.props.doj}/>
                                    </Form.Group>
                                    <Form.Group controlId="photoFileName">
                                        <Form.Label>photoFileName</Form.Label>
                                        <Form.Control 
                                        type="text" name="photoFileName" required 
                                        placeholder="photoFileName"
                                        defaultValue={this.props.photofilename}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Employee
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
