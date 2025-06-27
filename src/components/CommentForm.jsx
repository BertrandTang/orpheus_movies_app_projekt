import { Button, Form } from "react-bootstrap";

function CommentForm({ onSubmit, register, errors }) {
  const options = [];
  for (let i = 1; i <= 5; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <>
      <h1 className="text-start mt-4">Commentaires</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="comment" className="mb-3">
          <Form.Label>Ajouter un commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
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
            <option value="default">Sélectionnez une note</option>
            {options}
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
    </>
  );
}

export default CommentForm;
