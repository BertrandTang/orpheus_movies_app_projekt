import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Hook react-redux qui permet de lire et d'envoyer une action au store Redux
import { useSelector, useDispatch } from "react-redux";
// Nos actions
import { addComment, deleteComment } from "./redux/commentSlice";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "../public/styles/App.css";

const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Le commentaire est obligatoire.")
    .max(500, "Le commentaires ne doit pas excéder 500 caractères."),
  note: yup
    .string()
    .required("Veuillez sélectionner une note.")
    .test(
      "is_valid_note", 
      "Veuillez sélectionner une note.", 
      (value) => {
        if (value === "default") {
          return false; 
        }
        const numericValue = Number(value);
        return numericValue >= 1 && numericValue <= 5;
      }
    ),
  acceptConditions: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions générales."),
    
});

function App() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      note: "default",
      acceptConditions: false,
    },
  });

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
        // réponse brute qui est un array
        const rawData = await response.json();
        // on accède au data qui nous intéresse
        const exploitableData = rawData[0];

        // Formattage de la date au format attendu
        const fullDateString = exploitableData.release_date;
        const dateFormatted = fullDateString.split(", ")[1];
        exploitableData.release_date = dateFormatted;

        setMovie(exploitableData);
      } catch (error) {
        setError(
          "Une erreur est survenue lors de la récupération des produits."
        ); // Client
        console.error(error.message); // Développeur
      } finally {
        // Désactive l'état de chargement, qu'il y ait une erreur ou non
        setLoading(false);
      }
    }
    fetchOneRandomMovie();
  }, []);

  const onSubmit = (data) => {
    console.log("Données du formulaire validées :", data);
    const { _acceptConditions, ...dataToStore } = data;
    dispatch(addComment(dataToStore));
    reset();
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  if (error) return <p>Erreur : {error}</p>;
  if (loading) return <p>Chargement...</p>;

  return (
    movie && (
      <>
        <Container>
          <Row>
            <Col md={6} >
              <Card className="mt-4">
                <Card.Img variant="top" src={movie.poster_path} alt="caca" />
                <Card.Body className="pb-0">
                  <Card.Title>{movie.original_title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Sortie le {movie.release_date}
                  </Card.Subtitle>
                  <Card.Text>{movie.overview}</Card.Text>
                </Card.Body>
                <Card.Text className="p-3">
                  Note moyenne : {movie.vote_average} ({movie.vote_count} votes)
                </Card.Text>
              </Card>
              <h1 className="text-start mt-4">Commentaires</h1>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="comment" className="mb-3">
                  <Form.Label>Ajouter un commentaire</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    {...register("comment")}
                    isInvalid={!!errors.comment}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.comment?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note" className="mb-3">
                  <Form.Label>Note</Form.Label>
                  <Form.Select
                    aria-label="note"
                    {...register("note")}
                    isInvalid={!!errors.note}
                  >
                    <option value="default">Sélectionnnez une note</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.note?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="acceptConditions" className="mb-3">
                  <Form.Check
                    inline
                    label="J'accepte les conditions générales"
                    type="checkbox"
                    {...register("acceptConditions")}
                    isInvalid={!!errors.acceptConditions}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.acceptConditions?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Ajouter
                </Button>
              </Form>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <Card key={comment.id} className="p-2 mt-3">
                    <Card.Title>Note : {comment.note}/5</Card.Title>
                    <Card.Text>{comment.comment}</Card.Text>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Alert variant="info" className="text-center mt-3">
                  Aucun commentaire pour le moment.
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  );
}

export default App;
