import "./styles.css";
import BookEvent from "./components/bookEvent";
import EventListPage from "./components/eventListPage";
import { Switch, Route } from "react-router-dom";
import useFetch from "./components/hooks/useFetch"; //_usefetch3.useFetch issue is fixed by removing {}
//import cache from './cache';

export default function App() {
  const [response, loading, hasError, setResponse] = useFetch(
    "events.json",
    {}
  );

  return (
    <div className="App">
      <h1>Event Booking</h1>
      <Switch>
        <Route exact path="/">
          <EventListPage
            response={response}
            loading={loading}
            hasError={hasError}
            setResponse={setResponse}
          />
        </Route>
        <Route path="/bookevent/:id">
          <BookEvent response={response} setResponse={setResponse} />
        </Route>
      </Switch>
    </div>
  );
}
