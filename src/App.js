import Header from "./Component/Header/Header";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Container/Home/Home";
import Write from "./Container/Write/Write";
import Contact from "./Container/Contact/Contact";
import { useDispatch } from "react-redux";
import { getArticles } from './Service/service';
import { v4 as uuidv4 } from 'uuid';
import ArticleDetails from "./Container/ArticleDetails/ArticleDetails";

function App() {

  const dispatch = useDispatch();

  const setInitialArticles = (articles) => {
    dispatch({
      type: "SETARTICLES",
      payload: articles
    });
  }

  getArticles().then(res => {
    const articles = [];
    res.data.forEach(article => {
      articles.push({
        id: uuidv4(),
        title: article.title,
        articleText: article.body
      });
    });
    setInitialArticles(articles);
  });

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="App">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Home />} />
              <Route path="/write" element={<Write />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/article/:id" element={<ArticleDetails />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
