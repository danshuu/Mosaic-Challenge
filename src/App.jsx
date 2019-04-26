import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions/actions";
import NewsHeadlines from "./components/NewsHeadlines";
import SearchBox from "./components/SearchBox";
import Link from "@material-ui/core/Link";
import "./App.css";

const mapDispatchToProps = dispatch => ({
  setData: data => dispatch(actions.setData(data))
});

class App extends Component {
  componentDidMount() {
    const { setData } = this.props;
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=124dbba1134c4f38b360ec691055ea73"
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
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
  }
  render() {
    return (
      <div className="App">
        <SearchBox />
        <NewsHeadlines />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
