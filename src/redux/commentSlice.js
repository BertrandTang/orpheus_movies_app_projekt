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
                state.splice(index, 1);
            }
        },
    },
});

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
