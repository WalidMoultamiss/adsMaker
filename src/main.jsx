import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Login, Register, Dashboard, Editor } from "@pages";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/client";

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Home" element={<Dashboard />} />
          <Route path="/Editor" element={<Editor />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);
