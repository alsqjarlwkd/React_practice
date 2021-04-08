import React from "react";

class List extends React.Component{
    render(){
      let lists = [];
      let data = this.props.data;//pros는 부모 클래스에서 자식클래스에게 선언할때 사용
      let i = 0;
      while(i<data.length)
      {
        lists.push(<li key={data[i].id}>
          <a
          href={"/Contents/"+data[i].id}
          data-id={data[i].id}
          onClick={function(e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}>
            {data[i].title}</a>
          </li>)
          i=i+1;
      }
      return(
        <ul>
          {lists}
        </ul>
      );
    }
  }
  
  export default List;