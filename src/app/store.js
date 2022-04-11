import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/user";
import { livraisonApi } from "../services/livraison";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [livraisonApi.reducerPath]: livraisonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
});

setupListeners(store.dispatch);