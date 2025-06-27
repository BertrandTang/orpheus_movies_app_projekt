import { Alert, Button, Card } from "react-bootstrap";

function CommentList({ comments, handleDeleteComment }) {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} className="p-2">
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
        <Alert variant="info" className="mt-3">
          Aucun commentaire pour le moment.
        </Alert>
      )}
    </>
  );
}

export default CommentList;
