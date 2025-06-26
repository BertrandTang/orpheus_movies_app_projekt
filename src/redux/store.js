// Cerveau de l'application Redux
// Responsable de la création de la création et de la configuration du store Redux

import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./commentSlice"; // Importation du reducer

const store = configureStore({
    reducer: {
        // Reducer racine qui combine les autres reducers
        comments: commentReducer,
    },
});

export default store;
