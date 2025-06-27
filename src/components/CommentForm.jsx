import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addComment } from "../redux/commentSlice";

const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Le commentaire est obligatoire.")
    .max(500, "Le commentaires ne doit pas excéder 500 caractères."),
  note: yup
    .number()
    .typeError("Veuillez sélectionner une note."),
  acceptConditions: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions générales."),
});

function CommentForm({ dispatch }) {
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

  const options = [];
  for (let i = 1; i <= 5; i++) {
    options.push(
      <option key={i} value={Number(i)}>
        {Number(i)}
      </option>
    );
  }

  return (
    <>
      <h1 className="text-start mt-4">Commentaires</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
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