import React from "react";
import useFetch from "./hooks/useFetch";
import { useState } from "react";
import EventCardComp from "../components/eventCardComp";
import { useBetween } from "use-between";

export default function EventListPage({
  response,
  loading,
  hasError,
  setResponse
}) {
  const [value, setValue] = useState("");
  //var filterableresults = { ...response };

  /*React.useEffect(() => {
    fetch("events.json")
      .then((res) => res.json())
      .then((result) => {
        console.log("******2", result.events);
        setState(result.events);
      })
      .catch((err) => setHasError(true));
  });
  function handleOnInputChange(e) {
    if (e.target.value !== "") {
      const filteredresp = response.filter(
        (item) => item.eventHead === e.target.value
      );
      console.log("e.target.value", e.target.value);
      console.log("filteredresp", filteredresp);
      if (filteredresp.length > 0) {
        setResponse(filteredresp);
      }
    } else {
      console.log("e.target.value", e.target.value);
      console.log("filteredresp", response);
      reload = true;
      setResponse(response);
    }
  }*/
  return (
    <div className="eventList">
      <div>
        <input
          type="text"
          value={value}
          className="eventsearch"
          onChange={(e) => {
            setValue(e.target.value);
            /*response[1].eventSeatsavail = 0;
            setResponse(response);*/
          }}
          placeholder="SEARCH EVENTS"
        />
      </div>
      <p>Events list</p>
      <div className="posts">
        {loading ? (
          <div className="centernotify">Loading...</div>
        ) : hasError ? (
          <div>Error occured.</div>
        ) : (
          response
            .filter((item) => {
              if (!value) return true;
              if (
                /*item.eventHead.includes(value) ||*/
                item.eventHead.toLowerCase().includes(value.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((data) => (
              <div key={data.eventId} className="post">
                <EventCardComp props={data} />
              </div>
            ))
        )}
        {response.filter((item) => {
          if (!value) return true;
          if (item.eventHead.toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
          return false;
        }).length === 0 && value !== "" ? (
          <div className="centernotify">No results found!</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
