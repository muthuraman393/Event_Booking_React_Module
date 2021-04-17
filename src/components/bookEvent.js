import React, { useRef, useState } from "react";
import cache from "../cache";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
//import { useBetween } from "use-between";
import { useInput } from "./hooks/input-hook";
/*No of seats selection */
let options = [];
for (let i = 1; i < 7; i++) {
  options.push({ value: i, label: i });
}
export default function BookEvent({ response, setResponse }) {
  //const [, ,] = useFetch("events.json");
  const selectRef = useRef();
  const [selectedOption, setSelectedOption] = useState(null);
  let { id } = useParams();
  const eventinfo = response.filter((item) => {
    return Number(item.eventId) === Number(id);
  })[0];

  const {
    value: userName,
    bind: bindUserName,
    reset: resetUserName
  } = useInput("");
  const [nameerror, setNameerror] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [phoneerror, setPhoneerror] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [seatserror, setSeatserror] = useState("");
  const [nameofattendee, setNameofattendee] = useState({});

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: phoneNumber,
    bind: bindPhoneNumber,
    reset: resetPhoneNumber
  } = useInput("");

  const historybk = useHistory();

  const routeChange = () => {
    let path = `/`;
    historybk.push(path);
    //historybk.goBack
  };
  if (response.length === 0) {
    window.location = "https://" + window.location.hostname; //back to home
  }
  function nameofattendeeAdd(event) {
    //console.log(event.target.id, event.target.value);
    //console.log("nameofattendee", nameofattendee);
    nameofattendee[event.target.id] = event.target.value;
    //console.log("before dset newvalue", nameofattendee);
    setNameofattendee(nameofattendee);
    //console.log("newvalue", nameofattendee);
  }
  function handleValidtaion() {
    let errorcount = 0;
    let usernameregex = /^[a-zA-Z ]*$/;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phonePattern = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    if (userName === "") {
      setNameerror("Please Enter Username");
      errorcount++;
    } else if (!usernameregex.test(userName)) {
      setNameerror("Only letters and spaces are allowed");
      errorcount++;
    } else {
      setNameerror("");
    }
    if (email === "") {
      setEmailerror("Please Enter Email");
      errorcount++;
    } else if (!emailPattern.test(email)) {
      setEmailerror("Invalid Email");
      errorcount++;
    } else {
      setEmailerror("");
    }
    if (phoneNumber === "") {
      setPhoneerror("Please Enter PhoneNumber");
      errorcount++;
    } else if (!phonePattern.test(phoneNumber)) {
      setPhoneerror("Invalid Phone Number");
      errorcount++;
    } else {
      setPhoneerror("");
    }
    if (selectedOption === null) {
      setSeatserror("Please enter the number of seats");
      errorcount++;
    } else if (
      selectedOption.value !== undefined &&
      selectedOption.value > eventinfo.eventSeatsavail
    ) {
      setSeatserror("Number of seats selected is more than available seats");
      errorcount++;
    } else {
      setSeatserror("");
    }
    //validator for name of attendees
    console.log("s", selectedOption, eventinfo.eventSeatsavail);
    if (
      selectedOption != null &&
      selectedOption.value !== undefined &&
      selectedOption.value > 1 &&
      selectedOption.value <= eventinfo.eventSeatsavail
    ) {
      console.log("s", selectedOption);

      for (let k = 1; k < selectedOption.value; k++) {
        const nameofattTextval = document.getElementById("nameofatt" + k).value;
        let element = document.getElementById("nameofatthelp" + k);
        if (nameofattTextval === "") {
          element.classList.remove("hide");
          errorcount++;
        } else {
          element.classList.add("hide");
        }
      }
    }

    //console.log(errorcount);
    if (errorcount > 0) return true;
    else return false;
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    if (handleValidtaion()) {
      return false;
    }
    let displayattendees =
      selectedOption != null &&
      selectedOption.value !== undefined &&
      selectedOption.value > 1
        ? JSON.stringify(Object.values(nameofattendee))
        : "";
    let ssmsg = `${selectedOption.value} No of Seats have been booked successfully for the below customer    Name : ${userName},Email: ${email} ,Phone: ${phoneNumber} with these ${displayattendees} attendees`;
    //alert(ssmsg);
    console.log(ssmsg);
    setSuccessmsg(ssmsg);
    let newresp = response.map((item) => {
      if (item.eventId === eventinfo.eventId) {
        item.eventSeatsavail = item.eventSeatsavail - selectedOption.value;
      }
      return item;
    });
    // console.log(newresp);
    setResponse(newresp); // updating the Event booking States with latest avialable seats
    handleclear();
    resetUserName();
    resetPhoneNumber();
    resetEmail();
  }
  const handleChange = (value) => {
    console.log(" handlechange  value", value);
    setSelectedOption(value);
    console.log("handlechange seleoption", selectedOption);
  };
  const handleclear = () => {
    //setSelectedOption({ value: null, label: null });
    console.log("selectedOption = null", selectRef);
    selectRef.current.select.clearValue();
  };
  const imagestateuri = "../img/" + eventinfo.eventProfilepic + ".jpg";
  //console.log("asdsdsdd", id, response, eventinfo, imagestateuri);

  return (
    <div className="EventbookingGrid">
      <div className="successmsg">{successmsg}</div>
      <h2>{eventinfo.eventHead}</h2>
      <h3>No. of Available Seats : {eventinfo.eventSeatsavail}</h3>
      <div className="leftformsection">
        <img
          src={imagestateuri}
          alt="Event ProfilePic"
          className="eventProfilepic"
        ></img>
      </div>
      <div className="rightformsection">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="exampleInputuser">UserName</label>

            <input
              name="userName"
              type="text"
              className="form-control"
              id="userName"
              {...bindUserName}
              aria-describedby="UsernameHelp"
              placeholder="Enter Username"
            />
            <small id="UsernameHelp" className="form-text text-muted">
              {nameerror}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>

            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              {...bindEmail}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              {emailerror}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputnumber">Phone Number</label>

            <input
              name="phoneNumber"
              type="text"
              className="form-control"
              id="phoneNumber"
              {...bindPhoneNumber}
              aria-describedby="phoneHelp"
              placeholder="Enter phoneNumber"
            />
            <small id="phoneHelp" className="form-text text-muted">
              {phoneerror}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="examplenoofSeats">Number of Seats</label>
            <Select
              defaultValue={selectedOption}
              onChange={handleChange}
              options={options}
              className="seatselector"
              isClearable={true}
              ref={selectRef}
            />

            <small id="noofSeatsHelp" className="form-text text-muted">
              {seatserror}
            </small>
          </div>

          {(() => {
            const items = [];
            if (
              selectedOption !== null &&
              selectedOption.value !== undefined &&
              selectedOption.value <= eventinfo.eventSeatsavail
            ) {
              for (let j = 1; j < selectedOption.value; j++) {
                items.push(
                  <div key={`numofatt${j}`} className="form-group">
                    <label htmlFor="examplenumberofAtt">
                      Name of Attendee #{j}
                    </label>

                    <input
                      name={`nameofatt${j}`}
                      type="text"
                      className="form-control"
                      onChange={nameofattendeeAdd}
                      id={`nameofatt${j}`}
                      placeholder={`Enter Name of Attendee #${j}`}
                    />
                    <small
                      id={`nameofatthelp${j}`}
                      className="form-text text-muted hide"
                    >
                      Please Enter Name of Attendee #{j}
                    </small>
                  </div>
                );
              }
              return <div>{items}</div>;
            }

            return null;
          })()}
          <div className="form-groupbtn">
            <input
              type="submit"
              className="btn btn-primary button"
              value="Submit"
            />

            <button className="btn btn-primary button" onClick={routeChange}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="clearAll"></div>
    </div>
  );
}
