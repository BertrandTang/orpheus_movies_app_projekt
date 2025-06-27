import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import MovieInformation from "./components/MovieInformation";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import "../public/styles/App.css";

function App() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    async function fetchOneRandomMovie() {
      try {
        const response = await fetch("https://jsonfakery.com/movies/random/1");

        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }
        const rawData = await response.json();
        const exploitableData = rawData[0];

        const dateObject = new Date(exploitableData.release_date);
        const dateFormatted = dateObject.toLocaleDateString("fr-FR");
        exploitableData.release_date = dateFormatted;

        setMovie(exploitableData);
      } catch (error) {
        setError(
          "Une erreur est survenue lors de la récupération des produits."
        );
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOneRandomMovie();
  }, []);

  if (error) return <p>Erreur : {error}</p>;
  if (loading) return <p>Chargement...</p>;

  return (
    movie && (
      <Container>
        <Row>
          <Col md={6} className="offset-md-3">
            <MovieInformation movie={movie} />
            <CommentForm dispatch={dispatch} />
            <CommentList comments={comments} dispatch={dispatch} />
          </Col>
        </Row>
      </Container>
    )
  );
}

export default App;
