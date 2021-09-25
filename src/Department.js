import React, { Component } from 'react';
import { variables } from './Variables';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'department')
            .then(response => response.json())
            .then(data => {
                this.setState({ departments: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(depId) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'department/' + depId, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    changeDepartmentName = (e) => {
        this.setState({ departmentName: e.target.value });
    }

    addClick() {

        this.setState({

            modalTitle: "Add Department",
            departmentId: 0,
            departmentName: ""
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Department",
            departmentId: dep.departmentId,
            departmentName: dep.departmentName
        });
    }

    render() {
        const {
            departments,
            depId,
            depName
        } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <Table className="mt-4" stripped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>departmentId</th>
                            <th>departmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep =>
                            <tr key={dep.departmentId}>
                                <td>{dep.departmentId}</td>
                                <td>{dep.departmentName}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.setState({
                                            editModalShow: true,
                                            depId: dep.departmentId, depName: dep.departmentName
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <EditDepModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        depId={depId}
                                        depName={depName} />


                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteDep(dep.departmentId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Department
                    </Button>
                    <AddDepModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddDepModal>
                </ButtonToolbar>

            </div>
        )

        /*const {
            departments,
            modalTitle,
            departmentId,
            departmentName
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Department
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                DepartmentId
                            </th>
                            <th>
                                DepartmentName
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep =>
                            <tr key={dep.departmentId}>
                                <td>{dep.departmentId}</td>
                                <td>{dep.departmentName}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg></button>
                                    <button type="button" className="btn btn-light mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg></button>

                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>

                <div id="exampleModal" className="modal fade" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">departmentName</span>
                                    <input type="text" className="form-control"
                                        value={departmentName}
                                        onChange={this.changeDepartmentName} />
                                </div>
                                {departmentId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start">
                                        Create
                                    </button>
                                    : null}

                                {departmentId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start">
                                        Update
                                    </button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )*/
    }
}