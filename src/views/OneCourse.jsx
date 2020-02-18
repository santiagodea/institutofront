import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import InfoAlumno from "views/InfoAlumno";
import NewStudent from "views/NewStudent";
import AddMark from "views/AddMark";
import axios from "axios";
import { Alert } from "react-alert";
import JSAlert from "js-alert";

import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const thArray = ["Surname", "Name", " "];


class FilaAlumno extends React.Component {
  /** --- Link para Info del Alumno ---  */
  render() {
    const alumno = this.props.alumno;
    return (
      <tr id="infoAlum" key={alumno._dni}>
        <td>{alumno.surname}</td>
        <td>{alumno.name}</td>
        <td >{this.props.children}</td>
      </tr>
    );
  }
}

class OneCourse extends Component {

  constructor(props) {
    super(props);
    this.curso = this.props.curso;
    this.state = {
      id: null,
      scId: "",
      nombre: "",
      nivel: "",
      turno: "",
      profesor: "",
      formErrors: {},
      niveles: [1, 2, 3, 4, 5],
      turnos: ["Tomorrow", "Afternoon", "Night"],
      students: [],
      mostrarPanelDeAlumno: false,
      alumnoActual: null,
      marksAlumnoActual: [],
      agregaNota: false,
      panelAlumnos: true,
      panelNuevoAlumno: false,
      tamanioPanel: "col-md-12"
    };
  }

  componentDidMount() {
    this.llenarCurso(this.curso);
    this.getDataCourse();
  }

  ordernarStudent(students) {
    var studentOrd = students.sort((a, b) => a.surname > b.surname ? 1 : -1).sort((a, b) => +a.name - b.name);
    return studentOrd;
  }


  getDataCourse() {
    let self = this;
    return axios
      .get("/api/course/findByIdWithStudents/" + this.curso.id)
      .then(function (response) {
        const listaDeS = response.data.studentListDTO;
        self.setState({
          students: listaDeS
        })
        return Promise.resolve(listaDeS);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMarks(estudiante) {
    let self = this;
    const idCS = {
      idCourse: self.curso.id,
      idStudent: estudiante.id
    }
    return axios
      .get("/api/mark/marksBySC", { params: idCS })
      .then(function (response) {
        const listaDeMark = response.data.marksListDTO;
        self.setState({
          marksAlumnoActual: listaDeMark
        })
        return Promise.resolve(listaDeMark);
      })
      .then(function (res) {
      })
      .catch(function (error) {
        console.log(error);
      });
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


  generarPDFAssist() {
    var cuerpo = [];
    var titulos = [
      { text: 'Surname', bold: true, alignment: 'center' },
      { text: 'Name', bold: true, alignment: 'center' },
      { text: 'DNI', bold: true, alignment: 'center' },
      { text: 'Assists', bold: true, alignment: 'center' },
    ];

    var lAgregados = this.ordernarStudent(this.state.students);
    cuerpo.push(titulos);
    lAgregados.map(agregado => {
      var fila = [];
      fila.push(agregado.surname);
      fila.push(agregado.name);
      fila.push(agregado.dni);
      fila.push([
        {
          table: {
            headerRows: 1,
            alignment: 'center',
            widths: [70, 70, 70, 70, 70],
            body: [
              ['_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _'],
              ['_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _', '_ _ _ _ _ _ _ _']
            ],
          },
          layout: 'noBorders'
        }
      ])
      return cuerpo.push(fila);
    });

    var docDefinition = {

      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Students of: ' + this.state.nombre + ', Level: ' + this.state.nivel + ', Shift : ' + this.state.turno + ', Teacher: ' + this.state.profesor,
          style: 'header', bold: true, alignment: 'center', fontSize: 20
        },
        { text: ' ', style: 'header' },
        {
          table: {
            headerRows: 2, alignment: 'center',
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: cuerpo
          }
        },
        { text: ['English Language Centre - Gral. Belgrano'], color: 'gray', italics: true },

      ]
    };
    pdfMake.createPdf(docDefinition).open();
  }

  generarPDFMarks() {
    var self = this;
    var cuerpo = [];
    var titulos = [
      { text: 'Surname', bold: true, alignment: 'center' },
      { text: 'Name', bold: true, alignment: 'center' },
      { text: 'DNI', bold: true, alignment: 'center' },
      { text: 'Unit 1', bold: true, alignment: 'center' },
      { text: 'Unit 2', bold: true, alignment: 'center' },
      { text: 'Unit 3', bold: true, alignment: 'center' },
      { text: 'Unit 4', bold: true, alignment: 'center' },
      { text: 'Unit 5', bold: true, alignment: 'center' },
      { text: 'Unit 6', bold: true, alignment: 'center' },
      { text: 'Unit 7', bold: true, alignment: 'center' },
      { text: 'Unit 8', bold: true, alignment: 'center' },
      { text: 'Unit 9', bold: true, alignment: 'center' },
      { text: 'Unit 10', bold: true, alignment: 'center' },
    ];

    var lAgregados = self.ordernarStudent(this.state.students);
    console.log(lAgregados)
    cuerpo.push(titulos);
    lAgregados.map(agregado => {
      var fila = [];
      fila.push(agregado.surname);
      fila.push(agregado.name);
      fila.push(agregado.dni);

      let notas = this.ordenarMarks(agregado.marks);


      for (let index = 0; index < 10; index++) {
        var markAct = notas.find(n => n.unit == (index + 1) )
        console.log(markAct)
        if (markAct){
          fila.push(markAct.calification)
        }
        else{
          fila.push(" - ")
        }
      }

      return cuerpo.push(fila);
    });

    var docDefinition = {

      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Students of: ' + this.state.nombre + ', Level: ' + this.state.nivel + ', Shift: ' + this.state.turno + ', Teacher: ' + this.state.profesor,
          style: 'header', bold: true, alignment: 'center', fontSize: 20
        },
        { text: ' ', style: 'header' },
        {
          text: 'Marks ',
          style: 'header',
          bold: true,
          alignment: 'center',
          fontSize: 25
        },
        { text: ' ', style: 'header' },
        {
          table: {
            headerRows: 2,
            alignment: 'center',
            widths: ['auto', 'auto', 'auto', 'auto','auto', 'auto','auto','auto', 'auto','auto','auto', 'auto','auto'],
            body: cuerpo
          }
        },
        { text: ['English Language Centre - Gral. Belgrano'], color: 'gray', italics: true },

      ]
    };
    pdfMake.createPdf(docDefinition).open();
  }

  recargado() {
    this.setState({
      agregaNota: false,
      panelAlumnos: true,
      panelNuevoAlumno: false
    })
    this.getDataCourse();
  }

  recargadoMarks(estudiante) {
    this.getMarks(estudiante)
  }

  recargadoNotas() {
    this.getDataCourse();
    this.setState({
      agregaNota: false,
      panelAlumnos: true,
      mostrarPanelDeAlumno: true
    })
  }

  llenarCurso(curso) {
    this.setState({
      curso: curso,
      id: curso.id,
      nombre: curso.name,
      nivel: curso.level,
      turno: curso.shift,
      profesor: curso.teacher,
      panelAlumnos: true,
      panelNuevoAlumno: false
    });
  }

  manejarSeleccionTurnos(event) {
    this.setState({ turno: event.target.value });
  }
  manejarSeleccionNivel(event) {
    this.setState({ nivel: event.target.value })
  }

  /** ---   Botones   --- */
  botones(estudiante) {
    return (

      <div class="btn-group"
        style={{
          marginRight: "6px",
          textAlign: "center"
        }}>
        {this.botonDetalle(estudiante)}
        {this.botonNota(estudiante)}
        {this.botonEditar(estudiante)}
        {this.botonEliminar(estudiante)}
      </div>
    );
  }
  botonDetalle(estudiante) {
    return this.botonStandard(
      "Info ",
      () => this.mostrarDatosAlumno(estudiante),
      "btn-primary btn-xs",
      "fa-info"
    );
  }

  botonEliminar(estudiante) {
    return <Alert>
      {alert => (
        this.botonStandard(
          "Delete",
          () => this.confirmacionEliminarAlumno(alert,estudiante),
          "btn-danger btn-xs",
          "fa-close"
        )
      )}
    </Alert>
  }
  botonEditar(estudiante) {
    return this.botonStandard(
      "Edit",
      () => this.editarAlumno(estudiante),
      "btn-warning btn-xs",
      "fa-pencil"
    );
  }


  botonNota(estudiante) {
    return this.botonStandard(
      "Add Mark",
      () => this.agregarNota(estudiante),
      "btn-success btn-xs",
      "fa-plus"
    );
  }
  botonStandard(label, accion, clasesAdicionales, glyphIcon) {
    return (
      <button
        className={"btn btn-fill " + clasesAdicionales}
        style={{
          marginRight: "4px",
          paddingRight: "50px",
          textAlign: "center"
        }}
        onClick={() => accion()}
      >
        <span className={"fa " + glyphIcon}> {label} </span>
      </button>
    );
  }

  agregarEstudiante() {
    this.setState({
      alumnoActual: null,
      panelAlumnos: false,
      panelNuevoAlumno: true
    });
  }
  cancelarNuevoAlumno() {
    this.setState({
      panelAlumnos: true,
      panelNuevoAlumno: false
    });
  }

  editarAlumno(estudiante) {
    this.setState({
      panelAlumnos: false,
      panelNuevoAlumno: true,
      alumnoActual: estudiante
    });
  }


  mostrarNuevoStudent() {
    if (this.state.panelNuevoAlumno) {
      return (
        <div>
          <NewStudent
            alumno={this.state.alumnoActual}
            onCancel={() => this.cancelarNuevoAlumno()}
            recargado={() => this.recargado()}
            course={this.curso}
          />
        </div>
      )
    }
  }
  mostrarAlumnos(panelInfo) {
    // if (this.state.tarjetaDeCursos) {

    return (
      <div>
        <div class="row">
          <div class={this.state.tamanioPanel}>
            <Card
              title="List of students"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {thArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {this.ordernarStudent(this.state.students).map(alum => (
                      <FilaAlumno alumno={alum}>{this.botones(alum)}</FilaAlumno>
                    ))}
                  </tbody>
                </Table>
              }
            />
          </div>

          <div class="col-md-6">
            {panelInfo}
          </div>

        </div>

        <div class="row">
          <div class="col-xs-4 col-md-3">
            <a class="btn btn-fill btn-danger" onClick={() => this.cancelar()}>Back</a>
          </div>
          <div class="col-xs-4 col-md-3">
            <a class="btn btn-fill btn-success" onClick={() => this.agregarEstudiante()}>Add Student</a>
          </div>
          <div class="col-xs-4 col-md-3">
            <a class="btn btn-fill btn-primary" onClick={() => this.generarPDFAssist()}>Print Listing For Assistance </a>
          </div>
          <div class="col-xs-4 col-md-3">
            <a class="btn btn-fill btn-primary" onClick={() => this.generarPDFMarks()}>Print List With Notes </a>
          </div>
        </div>
      </div>
    );
    // }
  }

  alumnosONuevoAlumno(panelInfo) {
    if (this.state.panelAlumnos) {
      return this.mostrarAlumnos(panelInfo);
    } else {
      return this.mostrarNuevoStudent();
    }
  }

  mostrarListado() {

  }


  cancelar() {
    this.props.onCancel();
  }

confirmacionEliminarAlumno(alert,estudiante){
  let self = this;
  return(
    JSAlert.confirm("Are you sure you want to delete he student " + estudiante.surname + " "+estudiante.name +  "?").then(function(result) {
      if (!result)
      return;
      self.eliminarAlumno(alert, estudiante)
  })
  )
}



  eliminarAlumno(alert, estudiante) {
    let self = this;
    const idCS = {
      idCourse: self.curso.id,
      idStudent: estudiante.id
    }
    return axios
      .put("/api/studentCourse/deleteById/", idCS)
      .then(function (res) {
        console.log("The student has been successfully removed from the course!");
        alert.success("The student " + estudiante.surname + " "+estudiante.name + " has been successfully deleted from the course!");
      })
      .then(function (res) {
        self.recargado();
      })
      .catch(function (error) {
        console.log("ERROR - " + error);
      });
  }
  mostrarDatosAlumno(estudiante) {
    this.recargadoMarks(estudiante);
    this.setState({
      mostrarPanelDeAlumno: true,
      alumnoActual: estudiante,
      agregarNota: false,
      tamanioPanel: "col-md-6"
    });
  }
  agregarNota(estudiante) {
    this.getDataCourse();
    this.setState({
      mostrarPanelDeAlumno: true,
      alumnoActual: estudiante,
      agregarNota: true,
      tamanioPanel: "col-md-6"
    });

  }
  cerrarInfoAlumno() {
    this.setState({
      mostrarPanelDeAlumno: false,
      agregarNota: false,
      tamanioPanel: "col-md-12"
    });
  }
  guardarMarks(marks) {
    this.setState({ marksAlumnoActual: marks });
  }

  render() {
    let panelInfo = null;
    if (this.state.mostrarPanelDeAlumno) {
      if (this.state.agregarNota) {
        panelInfo = (
          <div id="AddMark">
            <AddMark
              idCourse={this.curso.id}
              data={this.state.alumnoActual}
              screen={() => this.cerrarInfoAlumno()}
              agregarNota={this.state.agregarNota}
              recargado={() => this.recargadoNotas()}
              volver={(estudiante) => this.mostrarDatosAlumno(estudiante)}
            />
          </div>
        );
      }
      else {
        panelInfo = (
          <div id="InfoAlumno">
            <InfoAlumno
              idCourse={this.curso.id}
              data={this.state.alumnoActual}
              screen={() => this.cerrarInfoAlumno()}
              agregarNota={this.state.agregarNota}
              recargado={(estudiante) => this.recargadoMarks(estudiante)}
              guardarMarks={() => this.guardarMarks()}
              marks={this.state.marksAlumnoActual}
            />
          </div>
        );
      }
    }

    return (
      <div>
        <div className="card mb-8 mt-2">
          <div className="form-group">
            <div className="col-md-12">
              <h1>
                {" "}
                <b> {this.state.nombre}</b>
                {" "}
              </h1>{" "}
              <div class="row">
                <div class="col-xs-6 col-md-4"><h4>Level: <b> {this.state.nivel}</b></h4></div>
                <div class="col-xs-6 col-md-4"><h4>Shift: <b> {this.state.turno}</b></h4></div>
                <div class="col-xs-6 col-md-4"><h4>Teacher: <b> {this.state.profesor} </b></h4></div>
              </div>

              {this.alumnosONuevoAlumno(panelInfo)}

            </div>{" "}

          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default OneCourse;
