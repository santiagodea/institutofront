import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

class Home extends Component {
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
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
            <a href="/admin/courses">
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-danger" />}
                statsText="Charge Payment"
                //statsValue="105GB"
                //statsIcon={<i className="fa fa-refresh" />}
                //statsIconText="Updated now"
              />
              </a>
            </Col>
            <Col lg={3} sm={6}>
            <a href="/admin/students">
              <StatsCard
                bigIcon={<i className="pe-7s-study text-success" />}
                statsText="Enroll Student"
                // statsValue="$1,345"
                // statsIcon={<i className="fa fa-calendar-o" />}
                // statsIconText="Last day"
              />
              </a>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
            </Col>
            <Col md={4}>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
            </Col>

            <Col md={6}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
