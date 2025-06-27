import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { addComment, deleteComment } from "./redux/commentSlice";
import { Row, Col, Container } from "react-bootstrap";
import MovieInformation from "./components/MovieInformation";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import * as yup from "yup";
import "../public/styles/App.css";

const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Le commentaire est obligatoire.")
    .max(500, "Le commentaires ne doit pas excéder 500 caractères."),
  note: yup
    .string()
    .required("Veuillez sélectionner une note.")
    .notOneOf(["default"], "Veuillez sélectionner une note valide."),
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
    getValues,
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

  const onSubmit = () => {
    const note = getValues("note");
    const comment = getValues("comment");

    const dataToStore = {
      note: note,
      comment: comment,
    };

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
      <Container>
        <Row>
          <Col md={6} className="offset-md-3">
            <MovieInformation movie={movie} />
            <CommentForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
            />
            <CommentList
              comments={comments}
              handleDeleteComment={handleDeleteComment}
            />
          </Col>
        </Row>
      </Container>
    )
  );
}

export default App;
