import React from "react";
import ReactDOM from "react-dom/client";
import CustomLayout from "./components/CustomLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Stocks from "./components/StocksPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
<BrowserRouter>
 <Routes>
  <Route path="/" element={<CustomLayout></CustomLayout>} >
     <Route path="" element={<App></App>} ></Route>
     <Route path="stocks" element={<Stocks></Stocks>} ></Route>
  </Route>
 </Routes>
</BrowserRouter>
);
