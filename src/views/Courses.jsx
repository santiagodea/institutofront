import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import NewCourse from "views/NewCourse";
import OneCourse from "views/OneCourse";
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursoSeleccionado: null,
      tarjetaDeCursos: true,
      nuevocursoActivo: false,
      activarUnCurso: false,
      cursos: []
    }
  }

  componentDidMount() {
    this.getDataCourse();
  }
  recargado() {
    this.getDataCourse();
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  ordernarCourses(cursos) {
    var cursosOrd = cursos.sort((a, b) => a.level < b.level ? 1 : -1).sort((a, b) => a.name > b.name ? 1 : -1);
  return cursosOrd;
                    }

  getDataCourse() {
    let self = this;
    return axios
      .get("/api/course/findAll")
      .then(function (response) {
        const listCourses = response.data;
        self.setState({
          cursos: listCourses
        })
        return Promise.resolve(listCourses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tarjetaCursos(curso) {
    return (
      <div onClick={() => this.activarMostrarUnCurso(curso)} style={{ cursor: "pointer" }}>
        <Col lg={3} sm={6}>
          <div>
            <StatsCard
              //bigIcon={<i className="pe-7s-cash text-danger" />}
              statsText={curso.name}
              statsValue={curso.level}
              //statsIcon={<i className="fa fa-refresh" />}
              statsIconText={curso.shift + " - " + curso.teacher}
            />
          </div>
        </Col>
      </div>
    )
  }

  activarMostrarUnCurso(curso) {
    this.setState({
      cursoSeleccionado: curso,
      tarjetaDeCursos: false,
      nuevocursoActivo: false,
      activarUnCurso: true
    });
  }

  mostrarCursos() {
    if (this.state.tarjetaDeCursos) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              {this.ordernarCourses(this.state.cursos).map(c => this.tarjetaCursos(c))}
            </Row>
          </Grid>
          <a className="btn btn-fill btn-warning btn-block"
          onClick={() => this.accionOnClick()}
          //href="/admin/newCourse"
          >New Course</a>
        </div>
      );
    }
  }

  accionOnClick() {
    this.setState({
      tarjetaDeCursos: false,
      nuevocursoActivo: true
    });
  }

  mostrarNuevoCurso() {

    if (this.state.nuevocursoActivo) {
      return (
        <div>
          <NewCourse
            onCancel={() => this.cancelarNuevoCurso()}
            recargado={() => this.recargado()}
          />
        </div>
      )
    }
  }

  mostrarUnCurso() {
    if (this.state.activarUnCurso) {
      return (
        <div>
          <OneCourse
            curso={this.state.cursoSeleccionado}
            onCancel={() => this.cancelarNuevoCurso()}
          />
        </div>
      )
    }
  }

  cancelarNuevoCurso() {
    this.setState({
      tarjetaDeCursos: true,
      nuevocursoActivo: false,
      activarUnCurso: false
    });
  }
  tarjetasOUnCurso() {
    if (this.state.tarjetaDeCursos) {
      return this.mostrarCursos();
    } else {
      return this.mostrarUnCurso();
    }
  }

  render() {
    return (
      <div>
        {this.tarjetasOUnCurso()}
        {this.mostrarNuevoCurso()}
      </div>
    )
  }
}

export default Courses;
