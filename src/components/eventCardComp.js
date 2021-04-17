import React from "react";
import { useHistory } from "react-router-dom";

const EventCardComp = (props) => {
  //console.log(props.props);
  const historybk = useHistory();

  const routeChange = () => {
    let path = `/bookevent/` + props.props.eventId;

    historybk.push(path);
  };
  const imagestateuri = "img/" + props.props.eventProfilepic + ".jpg";
  return (
    <div className="eventCardComp">
      <p className="eventcardheading">{props.props.eventHead}</p>
      <img
        src={imagestateuri}
        alt="Event ProfilePic"
        className="eventProfilepic"
      ></img>
      <div className="cardDetails">
        <p>{props.props.eventDate}</p>
        <p>
          Seats Available:
          <span>{props.props.eventSeatsavail}</span>
        </p>

        <p>
          {props.props.eventSeatsavail === 0 ? (
            <button
              className="button disabled"
              value="Sold Out"
              disabled="disabled"
            >
              Sold Out
            </button>
          ) : (
            <button className="button" value="Book Now" onClick={routeChange}>
              Book Now
            </button>
          )}
        </p>
      </div>
    </div>
  );
};
export default EventCardComp;
