import React from "react";

class Subject extends React.Component
{
  render(){
    return(
      <header>
        <a href="/" onClick={function(e){
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}
        ><h1>{this.props.title}</h1></a>
        <p>{this.props.sub}</p>
      </header>
    );
  }
}

export default Subject;