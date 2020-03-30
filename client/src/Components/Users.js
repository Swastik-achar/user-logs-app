import React, { useState } from "react";
import { connect } from "react-redux";
import "./Users.css";
import { Modal, Button, Card } from "react-bootstrap";
import CalendarView from "./CalendarView";

function Users(props) {
  //maintaining the state values using React Hooks
  const [values, setValues] = useState({
    status: false,
    user: {},
    logs: "",
    calendar: false,
    events: []
  });

  //initializing the values of user, log details of the user and status for controlling the view
  const handleUser = user => {
    setValues({ status: true, user: user, logs: user.activity_periods });
  };

  //initializing the values of the user events
  const handleCalendar = () => {
    const events = values.logs.map(log => {
      return {
        start: new Date(log.start_time.slice(0, 10)),
        end: new Date(log.end_time.slice(0, 10)),
        title: `${log.start_time.slice(11)}-${log.end_time.slice(11)}`
      };
    });
    setValues({ calendar: true, events, status: false });
  };

  return (
    <div>
      <div className="nav">Dashboard</div>
      {values.calendar && ( //controlling the view of calendar component
        <Modal
          className="modal-dialog modal-lg"
          show={values.calendar}
          onHide={() => setValues({ calendar: false })}
          animation={true}
          centered
          size="lg"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {/* calling the Calendar component and passing the events of the particular user as props */}
            <CalendarView events={values.events} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setValues({ calendar: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* {users list view}  */}
      {props.users.map(user => {
        return (
          <div key={user.id} align="center">
            <br />
            <Card className="Card" onClick={() => handleUser(user)} body>
              <h3>User Name: &ensp;{user.real_name}</h3>
            </Card>
            <br />
          </div>
        );
      })}

      {/* {Controlled view of a User details in Modal}  */}
      {values.status && (
        <Modal
          show={values.status}
          onHide={() => setValues({ status: false })}
          animation={true}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <b>User Name: </b>
            &ensp;{values.user.real_name}
          </Modal.Header>
          <Modal.Body>
            <b>Location : </b>
            {values.user.tz}
            <br />
            <span>
              <b>Activity Periods: </b>
            </span>
            <br />
            {values.logs &&
              values.logs.map((log, i) => (
                <li key={i}>
                  <span>
                    <b>{log.start_time.slice(0, 10)}</b>
                  </span>
                  <br />
                  <>
                    &ensp;&ensp;{log.start_time.slice(11)} -{" "}
                    {log.end_time.slice(11)}
                  </>
                </li>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setValues({ status: false })}>Close</Button>

            {/* {triggering the Calendar view or view of logs of a user as calendar events} */}
            <Button onClick={handleCalendar}>View In Calendar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
export default connect(mapStateToProps)(Users);
