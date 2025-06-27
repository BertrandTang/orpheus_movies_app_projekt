import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.push({
                id: Date.now(),
                note: action.payload.note,
                comment: action.payload.comment,
            });
        },
        deleteComment: (state, action) => {
            const idToDelete = action.payload;
            const index = state.findIndex(comment => comment.id === idToDelete);

            if (index !== -1) {
                const newComments = [...state];
                newComments.splice(index, 1);
                return newComments;
            }
            return state;
        },
    },
});

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
