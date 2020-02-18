import React, { Component } from "react";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import axios from "axios";
import { Alert } from "react-alert";

class NewStudent extends Component {
    constructor(props) {
        super(props);
        this.course = this.props.course;
        this.student = this.props.student;
        this.state = {
            id: "",
            dni: 0,
            surname: "",
            name: "",
            email: "",
            tel_principal: 0,
            tel_secundario: 0
        };
    }

    componentDidMount() {
        if (this.props.alumno) {
            this.setState({
                id: this.props.alumno.id
            })
            console.log(this.props.alumno.id);
            this.llenarStudent(this.props.alumno)
        }
    }

    llenarStudent(student) {
        this.setState({
            dni: student.dni,
            surname: student.surname,
            name: student.name,
            email: student.mail,
            tel_principal: student.tel_principal,
            tel_secundario: student.tel_secundario
        });
    }

    guardaridStudent(idCreado) {
        this.setState({ id: idCreado });
        console.log(idCreado);
    }

    guardarSC() {
        let self = this;
        const sc = {
            year: new Date().getFullYear(),
            idStudent: self.state.id,
            idCourse: this.course.id
        }
        console.log(sc);
        axios
            .post("/api/studentCourse", sc)
            .then(function (res) {
                console.log("The new Student was successfully aggregate.");
            })
            .then()
            .catch(function (error) {
                console.log("ERROR - " + error);
            });
    }

    guardarOActualizar(alert) {
        if (this.state.id) {
            this.actualizarStudent(alert)
        }
        else {
            this.guardarStudent(alert)
        }
    }

    actualizarStudent(alert) {
        let self = this;
        const student = {
            id: self.state.id,
            dni: self.state.dni,
            surname: self.state.surname,
            name: self.state.name,
            mail: self.state.email,
            tel_principal: self.state.tel_principal,
            tel_secundario: self.state.tel_secundario
        };
        axios
            .put("/api/student/update", student)
            .then(function (res) {
                console.log("The new student was updated successfully.");
                alert.success("The new student was updated successfully.");
            })
            .then(function (res) {
                self.props.recargado();
                self.props.onCancel();
            })
            .catch(function (error) {
                console.log("ERROR - " + error);
            });
    }

    guardarStudent(alert) {
        let self = this;
        const student = {
            dni: self.state.dni,
            surname: self.state.surname,
            name: self.state.name,
            mail: self.state.email,
            tel_principal: self.state.tel_principal,
            tel_secundario: self.state.tel_secundario
        };
        axios
            .post("/api/student", student)
            .then(function (res) {
                console.log("The new Student was successfully created.");
                alert.success("The new Student was successfully created. ");
                self.guardaridStudent(res.data.id);
            })
            .then(function (res) {
                self.guardarSC();
            })
            .then(function (res) {
                self.props.recargado();
                self.props.onCancel();
            })
            .catch(function (error) {
                console.log("ERROR - " + error);
            });
    }

    cancelarAgregado() {
        this.props.onCancel();
    }

    cancelar() {
        this.props.onCancel();
    }

    render() {
        return (
            <div className="content">
                <Card
                    title="New Student"
                    content={
                        <form>
                            <FormInputs
                                ncols={["col-md-3"]}
                                properties={[
                                    {
                                        label: "DNI",
                                        type: "number",
                                        bsClass: "form-control",
                                        placeholder: "00000000",
                                        value: this.state.dni,
                                        onChange: event => this.setState({ dni: event.target.value }),
                                        defaultValue: 0,
                                        disabled: false
                                    }
                                ]}
                            />
                            <div className="col-md-5">
                                <FormInputs
                                    ncols={["col-md-10"]}
                                    properties={[
                                        {
                                            label: "Surname",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Surname",
                                            value: this.state.surname,
                                            onChange: event => this.setState({ surname: event.target.value }),
                                            defaultValue: " ",
                                            disabled: false
                                        }
                                    ]}
                                />
                            </div>
                            <div className="col-md-5">
                                <FormInputs
                                    ncols={["col-md-10"]}
                                    properties={[
                                        {
                                            label: "Name",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Name",
                                            value: this.state.name,
                                            onChange: event => this.setState({ name: event.target.value }),
                                            defaultValue: " ",
                                            disabled: false
                                        }
                                    ]}
                                />
                            </div>
                            <div className="col-md-10">
                                <FormInputs
                                    ncols={["col-md-10"]}
                                    properties={[
                                        {
                                            label: "Email",
                                            type: "email",
                                            bsClass: "form-control",
                                            placeholder: "student@email.com",
                                            value: this.state.email,
                                            onChange: event => this.setState({ email: event.target.value }),
                                            defaultValue: " ",
                                            disabled: false
                                        }
                                    ]}
                                />
                            </div>
                            <div className="col-md-5">
                                <FormInputs
                                    ncols={["col-md-10"]}
                                    properties={[
                                        {
                                            label: "Phone 1",
                                            type: "tel",
                                            bsClass: "form-control",
                                            placeholder: "02243-45-1234",
                                            value: this.state.tel_principal,
                                            onChange: event => this.setState({ tel_principal: event.target.value }),
                                            defaultValue: "0",
                                            disabled: false
                                        }
                                    ]}
                                />
                            </div>
                            <div className="col-md-5">
                                <FormInputs
                                    ncols={["col-md-10"]}
                                    properties={[
                                        {
                                            label: "Phone 2",
                                            type: "tel",
                                            bsClass: "form-control",
                                            placeholder: "02243-45-1234",
                                            value: this.state.tel_secundario,
                                            onChange: event => this.setState({ tel_secundario: event.target.value }),
                                            defaultValue: "0",
                                            disabled: false
                                        }
                                    ]}
                                />
                            </div>
                            <div className="clearfix" />

                        </form>
                    }
                />
                <div >
                    <div class="col-xs-6 col-md-4">
                        <button class="btn btn-fill btn-danger" onClick={() => this.cancelar()}>Cancel</button>
                    </div>
                    <Alert>
                        {alert => (
                            <button class="btn btn-fill btn-success" onClick={() => this.guardarOActualizar(alert)}>Save Student</button>
                        )}
                    </Alert>
                </div>
            </div>
        );
    }
}
export default NewStudent;
