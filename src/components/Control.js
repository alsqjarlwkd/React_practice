import React from "react";

class Control extends React.Component
{
  render(){
    return(
      <ul>
      <li><a href="/create" onClick={function(e){
        e.preventDefault();
        this.props.onChangeMode("create");
      }.bind(this)}>Create</a></li>
      <li><a href="/Update" onClick={function(e){
        e.preventDefault();
        this.props.onChangeMode("update");
      }.bind(this)}>Update</a></li>
      <li><input onClick={function(e){
        e.preventDefault();
        this.props.onChangeMode("delete");
      }.bind(this)} type="button" value="delete"></input></li>
      </ul>
    );
  }
}

export default Control;