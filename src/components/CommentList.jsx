import { Alert, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; 
import { deleteComment } from "./redux/commentSlice"; 

function CommentList() {
  const dispatch = useDispatch(); 
  const comments = useSelector((state) => state.comments); 

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <>
      {comments && comments.length > 0 ? (
        <ListGroup className="mt-3">
          {comments.map((comment) => (
            <ListGroup.Item
              key={comment.id}
              className="d-flex justify-content-between align-items-end"
            >
              <div className="flex-grow-1 me-2">
                <div className="fw-bold">Note : {comment.note}/5</div>
                <div>{comment.comment}</div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Supprimer
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info" className="mt-3">
          Aucun commentaire pour le moment.
        </Alert>
      )}
    </>
  );
}

export default CommentList;
