import { Container, Button, Row, Col } from "react-bootstrap";
import CSS from "../App.css";
import { Link } from "react-router-dom";

export default function ({ prop }) {
     const { title, description, destination } = prop;
     return (
          <>
               <Container fluid className="text-white" id="Banner">
                    <Row>
                         <Col className="text-center">
                              <h1>{title}</h1>
                              <p>{description}</p>
                              <Button as={Link} to={destination}>
                                   Explore
                              </Button>
                         </Col>
                    </Row>
               </Container>
          </>
     );
}
