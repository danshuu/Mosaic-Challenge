import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actions from "../actions/actions";

const mapStateToProps = store => ({
  articles: store.data,
  searchInput: store.searchInput,
  currentPage: store.currentPage
});

const mapDispatchToProps = dispatch => ({
  // setPages: data => dispatch(actions.setPages(data)),
  setCurrentPage: data => dispatch(actions.setCurrentPage(data))
});
const NewsHeadlines = ({
  articles,
  searchInput,
  currentPage,
  setCurrentPage
}) => {
  console.log(articles);
  articles = articles.filter(article => {
    return article.props.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
  const pageNumbers = Math.ceil(articles.length / 10);
  articles = articles.slice((currentPage - 1) * 10, currentPage * 10);
  let pages = [];
  for (let i = 1; i <= pageNumbers; i++) {
    pages.push(
      <Button
        key={i + Date.now()}
        onClick={() => {
          setCurrentPage(i);
        }}
      >
        {i}
      </Button>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>{articles}</div>
      <div style={{ padding: "20px" }}>{pages}</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsHeadlines);
