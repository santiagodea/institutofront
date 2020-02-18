import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class Abouts extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Santiago De Andrea  - UNQ - CIU"
                category="TIP - English Language Centre"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Abouts;
