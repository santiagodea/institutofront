import React from "react";
import Card from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import axios from "axios";
import { Alert } from "react-alert";

import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class AddPayment extends React.Component {
    constructor(props) {
        super(props)
        this.screen = this.props.screen    // con esto seteo la pantalla padre
        this.state = {
            agregarPago: this.props.agregarPago,
            alumno: this.props.data,
            amount: 0,
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            month: "January"
        }
    }

    generarPDFPago(newPayment) {
        console.log(newPayment)

        var fecha = newPayment.date_payment.toString().slice(0, 15);
        console.log(fecha);

        var student = this.state.alumno;
        var cuerpo = [];
        var docDefinition = {
            pageSize: 'A6',
            pageOrientation: 'landscape',
            content: [

                { text: ['English Language Centre - Gral. Belgrano'], color: 'gray', italics: true, alignment: 'center',fontSize: 15 },
                { text: ' ', style: 'header' },
                {
                    text: 'I received:',
                    style: 'header', bold: true, alignment: 'center',
                },
                {
                    text: 'The student: ' + student.surname + ' ' + student.name,
                    style: 'subheader', bold: true, alignment: 'center', fontSize: 20
                },
                { text: ' ', style: 'header' },

                {
                    text: 'Amount: '  + newPayment.amount,
                    style: 'subheader',
                    bold: true,
                    alignment: 'center',
                    fontSize: 20
                },
                { text: ' ', style: 'header' },
                { text: ' ', style: 'header' },
                {
                    text: 'for: ' + newPayment.month,
                    style: 'subheader', bold: true, alignment: 'center', fontSize: 20
                },
                { text: ' ', style: 'header' },
                {
                    text: 'Date: ' + fecha,
                    style: 'subheader',
                    bold: true,
                    alignment: 'center',
                    fontSize: 10
                }
            ]
        };
        pdfMake.createPdf(docDefinition).open();
    }

    actMonths() {
        var unitsAlum = this.alum().marks.map(m => m.unit);
        var unitsFalt = this.state.units.filter(l => !unitsAlum.includes(l));
        this.setState({ units: unitsFalt });
    }

    alum() {
        return this.props.data
    }

    mostrarInfo() {

    }

    savePayment(alert) {
        let self = this;
        const newPayment = {
            month: self.state.month,
            date_payment: new Date(),
            amount: self.state.amount,
            idStudent: self.props.data.id
        };
        axios
            .post("/payment", newPayment)
            .then(function (res) {
                alert.success("The payment has been loaded correctly.");
                console.log("A new payment has been added.");
                self.generarPDFPago(newPayment);
            })
            .then(function (res) {
                self.props.volver(self.alum());
            })
            .catch(function (error) {
                console.log("ERROR - " + error);
            });
    }

    manejarSeleccionDeMes(event) {
        this.setState({ month: event.target.value })
    }
    desplegar(collect) {
        return collect.map(c => (
            <option key={c} value={c}>
                {c}
            </option>
        ));
    }



    recuadroInfoAlumno() {
        const anchoLabel = 5
        return (
            <Card
                title="Add a new payment"
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
                                        {this.datoEnFila("Surname: ", this.alum().surname, anchoLabel)}
                                        {this.datoEnFila("Name :  ", this.alum().name, anchoLabel)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" style={{ margin: "2px" }}>
                            <div class="col-xs-6">
                                <div className="col-md-7">
                                    <label htmlFor="month"> Month: </label>
                                    <select
                                        label="Month"
                                        className="form-control"
                                        onChange={this.manejarSeleccionDeMes.bind(this)}
                                        defaultValue=" "
                                        id="meses"
                                    >
                                        {this.desplegar(this.state.months)}
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <FormInputs
                                    ncols={["col-xs-7"]}
                                    properties={[
                                        {
                                            label: "amount",
                                            type: "number",
                                            bsClass: "form-control",
                                            placeholder: "$100",
                                            value: this.state.amount,
                                            onChange: event => this.setState({ amount: event.target.value }),
                                            defaultValue: "000",
                                            disabled: false
                                        }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="card-bg-info" style={{
                            marginTop: "10px", marginLeft: "10px", marginBottom: "20px"
                        }}>
                            {
                                <Alert>
                                    {alert => (
                                        this.botonStandard(
                                            "Confirm ",
                                            () => this.savePayment(alert),
                                            "btn-primary btn-xs",
                                            "fa-"
                                        ))
                                    }
                                </Alert>
                            }
                            {this.botonStandard(
                                "Cancel ",
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
                onClick={() => accion(alert)}
            >
                <span className={"fa " + glyphIcon}> {label} </span>
            </button>
        );
    }
    render() {
        return (
            <div className="col-md-12">
                <div className="card text-dark">
                    {this.recuadroInfoAlumno()}
                </div>
            </div>
        )
    }


}
export default AddPayment;