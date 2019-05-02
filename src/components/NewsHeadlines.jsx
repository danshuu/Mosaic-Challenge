import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actions from "../actions/actions";
import Link from "@material-ui/core/Link";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const mapStateToProps = store => ({
  articles: store.data,
  searchInput: store.searchInput,
  currentPage: store.currentPage
});

const mapDispatchToProps = dispatch => ({
  // setPages: data => dispatch(actions.setPages(data)),
  setData: data => dispatch(actions.setData(data)),
  setCurrentPage: data => dispatch(actions.setCurrentPage(data))
});

const reorder = (list, startIndex, endIndex, setData) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "5px",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const NewsHeadlines = ({
  articles,
  searchInput,
  currentPage,
  setCurrentPage,
  setData
}) => {
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      articles,
      result.source.index,
      result.destination.index
    );

    setData(items);
    // this.setState({
    //   items
    // });
  }
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
      {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} key="key">
              {articles.map((article, index) => (
                <Draggable
                  key={article.key}
                  draggableId={article.key}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style }}
                    >
                      <Link href={article.props.url}>{`${
                        article.props.title
                      }`}</Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* {articles} */}
      {/* </div> */}
      <div style={{ padding: "20px" }}>{pages}</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsHeadlines);
