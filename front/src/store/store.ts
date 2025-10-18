import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import countReducer from "./slices/countSlice";
import themeReducer from "./slices/themeSlice";
import { trackApi } from "./services/trackApi";
import { genreApi } from "./services/genreApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        count: countReducer,
        theme: themeReducer,
        [trackApi.reducerPath]: trackApi.reducer,
        [genreApi.reducerPath]: genreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(trackApi.middleware)
            .concat(genreApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
