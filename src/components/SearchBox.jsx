import React from "react";
import TextField from "@material-ui/core/TextField";
import * as actions from "./../actions/actions";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  changeInput: input => dispatch(actions.changeInput(input))
});

const SearchBar = ({ changeInput }) => {
  const handleChange = event => {
    event.preventDefault();
    changeInput(event.target.value);
  };
  return (
    <form>
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
  null,
  mapDispatchToProps
)(SearchBar);
