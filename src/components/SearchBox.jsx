import React from "react";
import TextField from "@material-ui/core/TextField";
import * as actions from "./../actions/actions";
import { connect } from "react-redux";
import Link from "@material-ui/core/Link";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const mapDispatchToProps = dispatch => ({
  changeInput: input => dispatch(actions.changeInput(input)),
  setCurrentPage: data => dispatch(actions.setCurrentPage(data)),
  setData: data => dispatch(actions.setData(data))
});

const mapStateToProps = store => ({
  searchInput: store.searchInput
});

const SearchBar = ({ changeInput, setCurrentPage, setData, searchInput }) => {
  const handleChange = event => {
    event.preventDefault();
    changeInput(event.target.value);
    setCurrentPage(1);
  };
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        fetch(
          `https://newsapi.org/v2/everything?q=${searchInput}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
        )
          .then(response => response.json())
          .then(data => {
            let articleLinks = [];
            data.articles.forEach((article, index) => {
              articleLinks.push(
                <Link
                  key={article.url + index}
                  href={article.url}
                  target="_blank"
                  style={{ padding: "5px" }}
                  title={article.title}
                >
                  {article.title}
                </Link>
              );
            });

            setData(articleLinks);
          });
      }}
    >
      <TextField
        id="outlined-with-placeholder"
        placeholder="Search News"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
    </form>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
