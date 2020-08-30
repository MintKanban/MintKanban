import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap'
import { LandingPageNav } from "./NavBar/NavBar";


export default function LandingPage(){

  return (
    <>
      <LandingPageNav />
      <Container className="landing-page-main">
        <Row>
          <Col className="first-div-master">
                <div className="first-div">
                  <div className="card-body">
                    <h3 className="card-title">Plan for your tmrw.</h3>
                    <p className="card-text">From creating goals, no matter how big or small, tmrw is here to help you out today</p>
                  <Link to='/board'><button className="btn btn-secondary my-2 my-sm-0" type="submit">Go to your board</button></Link>
                  </div>
                </div>
          </Col>
          <Col>
            <img className="woman-planning"
              src="https://www.coderworldlabs.com/images/Web-Development.png"
              alt="woman-planning"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col >
            <div className="second-div" >
              <div className="card-body">
                <h2 className="card-title">Get order in your life</h2>
                <p className="card-text">
                  What do you need to get done?
                  What are your goals? For the day? For the week?
                  or For the year? 
                  Now you can set all those ideas in your head in one place.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={5}>
          <img className="plan-for-growth"
            src="https://www.startelelogic.com/assets/images/custom/custom-software-development.png"
            alt="growth"
          />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={4}>
            <img className="plan-for-growth"
              src="https://www.nicepng.com/png/full/29-296364_custom-software-development-in-islamabad-pakistan-system-administration.png"
              alt="growth"
            />
          </Col>
          <Col>
            <div className="second-div" >
              <div className="card-body">
                <h2 className="card-title">Plan for growth</h2>
                <p className="card-text">
                  Track your progress.
                  When you start a goal, see how far you've come!
                  When you complete a goal, move it along your tasks or remove it.
                  Studies show, when you see progress, you stick to your plan.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col >
            <div className="second-div" >
              <div className="card-body">
                <h2 className="card-title">Find time for a brighter tmrw</h2>
                <p className="card-text">
                  When you accomplish your goals, you will find more time in 
                  your life to do the things you love.
                  Spend time with your family, try out a new hobbie, travel. 
                  The time you invested in planning creates a happier and 
                  brighter tmrw for yourself!
                </p>
                
                <p>Start creating your board today!</p>
                <Link to='/board'><button className="btn btn-secondary my-2 my-sm-0" type="submit">Start your board</button></Link>
              </div>
            </div>
          </Col>
          <Col xs={5}>
            <img className="plan-for-growth" src="https://live.staticflickr.com/65535/50286276283_a6b48e448e_k.jpg" alt="growth"/>
          </Col>
        </Row>

        <Row className="mt-5">
          <h2 className="card-title">Meet the Engineers</h2>
          <CardGroup>
            <Card>
              <Card.Img variant="top"
                src="https://rrc-app.herokuapp.com/leo.jpeg"
              />
              <Card.Body>
                <Card.Title>Leo YulinLi</Card.Title>
                <Card.Text>
                  Leo is a software engineer experienced in React, Ruby on Rails, 
                  and Java/Kotlin development. Utilizing his extensive programming 
                  knowledge, he played an integral part in building the back end 
                  and utilizing async requests in parallel to improve load times. 
                  He is passionate about solving problems that positively impact 
                  every day life.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="social-links">
                  <a href="https://github.com/LeoYulinLi">
                    <img src="https://rrc-app.herokuapp.com/githubIcon.svg" 
                      alt="github"
                      className="social-emblem"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/leoyulinli/">
                    <img src="https://rrc-app.herokuapp.com/linkedInIcon.svg"
                      alt="linkedin"
                      className="social-emblem"
                    />
                  </a>
                </div>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="https://honeybear.herokuapp.com/static/media/bryan_sillorequez.a8f603ca.jpg" />
              <Card.Body>
                <Card.Title>Bryan Sillorequez</Card.Title>
                <Card.Text>
                  Bryan Sillorequez is a software engineer with an eye for design. 
                  Before software engineering, he was a photographer, which 
                  allows him to apply his technical design background to create 
                  eye-catching apps with great functionality. He has experience in
                  React/Redux, Ruby, JavaScript and CSS.  When he is not coding, 
                  you can find him thousands of feet up a rock face.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="social-links">
                  <a href="https://github.com/bvsillorequez">
                    <img src="https://rrc-app.herokuapp.com/githubIcon.svg"
                      alt="github"
                      className="social-emblem"
                    />
                  </a>
                  <a href="http://www.linkedin.com/in/bsillo">
                    <img src="https://rrc-app.herokuapp.com/linkedInIcon.svg"
                      alt="linkedin"
                      className="social-emblem"
                    />
                  </a>
                </div>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="https://rrc-app.herokuapp.com/ryan.png" />
              <Card.Body>
                <Card.Title>Ryan Tran</Card.Title>
                <Card.Text>
                  Ryan is a full stack engineer and graduate of UCSD.
                  Holding a B.S. in Electrical Engineering, he is experienced
                  in Javascript, React, Ruby on Rails, Typescript and Python.
                  He enjoys working on challenging problems,
                  and often finds himself learning new technologies
                  to best complete the tasks on hand.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="social-links">
                  <a href="https://github.com/rd-tran">
                    <img src="https://rrc-app.herokuapp.com/githubIcon.svg"
                      alt="github"
                      className="social-emblem"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/rdtran/">
                    <img src="https://rrc-app.herokuapp.com/linkedInIcon.svg"
                      alt="linkedin"
                      className="social-emblem"
                    />
                  </a>
                </div>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Row>

      </Container>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary"></nav>
    </>
  )
}
