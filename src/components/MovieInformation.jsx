import { Card } from "react-bootstrap";

function MovieInformation({ movie }) {
  return (
    <Card className="mt-4">
      <Card.Img variant="top" src={movie.poster_path} alt="film_poster" />
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
  );
}

export default MovieInformation;
