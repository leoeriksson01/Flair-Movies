import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import HomePage from "../src/Pages/HomePage";
import LatestMoviesPage from "./Pages/LatestMoviesPage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import PersonPage from "./Pages/PersonPage";
import GenrePage from "./Pages/GenrePage";
import TopRatedPage from "./Pages/TopRatedPage";
import SearchPage from "./Pages/SearchPage";
import GenresPage from "./Pages/GenresPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="backgroundImage">
        <div className="App">
          <Switch>
            <Route path="/" component={HomePage} exact />

            <Route path="/latest" component={LatestMoviesPage} exact />

            <Route path="/top" component={TopRatedPage} exact />

            <Route path="/movies/:id" component={MovieDetailPage} />

            <Route path="/person/:id" component={PersonPage} />

            <Route exact path="/genre/:id/:page?">
              <GenrePage />
            </Route>

            <Route path="/search" component={SearchPage} />
            <Route path="/genres" component={GenresPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
