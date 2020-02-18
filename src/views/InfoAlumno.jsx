import React from "react";
import Card from "components/Card/Card.jsx";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Alert } from "react-alert";
import JSAlert from "js-alert";


const titulosMarks = ["Unit", "Mark", "Date", " "];
const titulosPayments = ["Month", "Amount", "Date", " "];


class InfoAlumno extends React.Component {
    constructor(props) {
        super(props)
        this.screen = this.props.screen;    // con esto seteo la pantalla padre
        this.idCourse = this.props.idCourse;
        this.state = {
            marks: this.props.marks,
            payments: this.props.payments
        }
    }

    componentDidMount() {
        this.setState({
            idCourse: this.props.idCourse
        })
        this.props.recargado(this.alum());
    }


    alum() {
        return this.props.data
    }

    ordenarMarks(marks) {
        marks.sort(function (a, b) {
            if (a.unit > b.unit) {
                return 1;
            }
            if (a.unit < b.unit) {
                return -1;
            }
            return 0;
        });

        return marks;
    }

    notas() {
        let marksOrd = this.ordenarMarks(this.props.marks);
        return marksOrd.map(m => (
            <tr id="marks" key={m.id}>
                <td>{m.unit}</td>
                <td>{m.calification}</td>
                <td>{m.date}</td>
                <td >{
                    <Alert>
                        {alert => (<button type="button" class="btn btn-danger btn-xs" onClick={() => this.confirmacionEliminarMark(alert, m)}>Delete</button>)}
                    </Alert>
                }</td>
            </tr>
        ))
    }

    pagos() {
        return this.props.payments.map(p => (
            <tr id="payment" key={p.id}>
                <td>{p.month}</td>
                <td>{p.amount}</td>
                <td>{p.date_payment}</td>
                <td >{
                    <Alert>
                        {alert => (<button type="button" class="btn btn-danger btn-xs" onClick={() => this.confirmacionEliminarPayment(alert, p)}>Delete</button>)}
                    </Alert>
                }</td>
            </tr>
        ))
    }


    confirmacionEliminarMark(alert, mark) {
        let self = this;
        return (
            JSAlert.confirm("Are you sure you want to remove this Mark?").then(function (result) {
                if (!result)
                    return;
                self.borrarM(alert, mark)
            })
        )
    }

    confirmacionEliminarPayment(alert, payment) {
        let self = this;
        return (
            JSAlert.confirm("Are you sure you want to remove this payment?").then(function (result) {
                if (!result)
                    return;
                self.borrarP(alert, payment)
            })
        )
    }


    borrarM(alert, mark) {
        let self = this;
        axios
            .put("/api/mark/deleteById/" + mark.id)
            .then(function (res) {
                console.log("The Mark has been deleted successfully!");
                alert.success("The Mark has been deleted successfully!");
            })
            .then(function (res) {
                self.props.recargado(self.props.data);
            })
            .catch(function (error) {
                console.log("ERROR - " + error);
            });
    }


    borrarP(alert, payment) {
        let self = this;
        axios
            .put("/api/payment/deleteById/" + payment.id)
            .then(function (res) {
                console.log("The payment has been deleted successfully!");
                alert.success("The payment has been deleted successfully!");
            })
            .then(function (res) {
                self.props.recargado(self.props.data);
            })
            .catch(function (error) {
                console.log("ERROR - " + error);
            });
    }

    panelMarks() {
        return (<div className="card-body ">
            <Table striped hover>
                <thead>
                    <tr>
                        {titulosMarks.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.notas()}
                </tbody>
            </Table>
        </div>)
    }

    panelPayments() {
        return (<div className="card-body ">
            <Table striped hover>
                <thead>
                    <tr>
                        {titulosPayments.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.pagos()}
                </tbody>
            </Table>
        </div>)
    }

    marksOPayments() {
        if (this.state.marks) {
            return this.panelMarks();
        } else {
            return this.panelPayments();
        }
    }

    recuadroInfoAlumno() {
        const anchoLabel = 5
        return (
            <Card
                title="Student's Information"
                ctTableFullWidth
                ctTableResponsive
                content={
                    <div>
                        <div className="row ">
                            <div className="align-self-center card-bg-info col-md-8" style={{
                                marginTop: "20px", marginLeft: "30px", marginBottom: "20px",
                                borderStyle: "solid", borderWidth: "2px", borderColor: "#e9ecef", borderRadius: "6px",
                                paddingTop: "6px", paddingBottom: "10px", paddingLeft: "40px", paddingRight: "20px"
                            }}>
                                <div className="row">
                                    <div className="card-body ">
                                        {this.datoEnFila("Surname:", this.alum().surname, anchoLabel)}
                                        {this.datoEnFila("Name:", this.alum().name, anchoLabel)}
                                        {this.datoEnFila("D.N.I.:", this.alum().dni, anchoLabel)}
                                        {this.datoEnFila("Email:", this.alum().mail, anchoLabel)}
                                        {this.datoEnFila("Phone 1°:", this.alum().tel_principal, anchoLabel)}
                                        {this.datoEnFila("Phone 2°:", this.alum().tel_secundario, anchoLabel)}
                                    </div>
                                    {this.marksOPayments()}
                                </div>
                            </div>
                        </div>

                        <div className="card-bg-info" style={{
                            marginTop: "20px", marginLeft: "30px", marginBottom: "20px"
                        }}>
                            {this.botonStandard(
                                "Close ",
                                this.screen,
                                "btn-primary btn-xs",
                                "fa-"
                            )}
                        </div>
                    </div>
                }
            />

        )
    }

    datoEnFila(label, valor, anchoLabel = 3) {
        return (
            <div className="row" style={{ marginBottom: "6px" }}>
                <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>{label}</div>
                <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
            </div>
        )
    }


    // Botón -  parámetros Label , Acción, Clases Adicionales, Icono (GlypIcon)
    botonStandard(label, accion, clasesAdicionales, glyphIcon) {
        return (
            <button
                className={"btn btn-fill " + clasesAdicionales}
                style={{
                    marginRight: "5px",
                    paddingRight: "100px",
                    textAlign: "center"
                }}
                onClick={() => accion()}
            >
                <span className={"fa " + glyphIcon}> {label} </span>
            </button>
        );
    }
    render() {
        return (
            <div className="col-md-12">
                <div className="card text-dark">
                </div>
                {this.recuadroInfoAlumno()}
            </div>
        )
    }


}
export default InfoAlumno;
