import './App.css';//App.css 를 임포트
import React from "react";//기본적으로 React를 사용하기 위해서는 필요한 임포트
import List from "./components/List";//List 라는 변수에 ./components/List를 임포트 
import Subject from "./components/Subject";//Subject 라는 변수에 ./components/Subject를 임포트
import ReadContent from "./components/ReadContent";//Content 라는 변수에 ./componets/Content를 임포ㅌ
import Control from "./components/Control";
import CreateContent from "./components/CreateContents";
import UpdateContent from "./components/UpdateContent";

class Ahn extends React.Component{//Class 를 생성하는데 컴포넌트를 생성하는 부분을 상속받아옴
  render(){//기본적으로 Html 페이지에 뿌려주기 위해서 render() 함수를 사용
    return(//기본적으로 return 을 함으로써 사용
      <div>안녕하세요</div>
    );
  }
}

class App extends React.Component {
  constructor(props){//생명주기 초기화 제일처음 시작
    //state 의 사용 이유
    //정보의 은닉화 데이터값을 밖에서 함부로 안에서 볼수 없기 떄문에
    //내부적인 데이터 값 작업을 진행할때 사용
    super(props);
    this.max_content_id=3;
    this.state={//state 는 클래스 내부에서 선언할수 있음
      mode:"welcome",//state 내부 데이터 세팅
      selected_content_id:2,
      Subject:{title:"web",sub:"world world!!"},
      welcome:{title:"welcome",desc:"Hello React!!"},
      contents:[
        {id:1,title:"HTML",desc:"HTML is Hyper Text1..."},
        {id:2,title:"xml",desc:"HTML is Hyper Text2..."},
        {id:3,title:"JavaScript",desc:"HTML is Hyper Text3..."},
      ]
    }
  }
  getReadContent(){//this.state에서 content의 데이터를 가져옴
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;//데이터를 리턴
          break;
        }
        i = i + 1;
      }
  }
  getContent(){//해당 콘텐츠를 받아서 _article로 리턴
    var _title, _desc, _article = null;
    if(this.state.mode ===  'welcome'){//state mode가 welcome일때
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} des={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();//data로 반횐된 값을 _content 변수에 넣음
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else  if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = Array.from(this.state.contents);//Content에 있는 배열을 하나 다른것으로 생성
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});//max_content_id와 타이틀 디스크립션을 푸시
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else  if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render(){
    return(
      <div className = "App">
      <Subject 
      title={this.state.Subject.title} 
      sub={this.state.Subject.sub}
      onChangePage={function(){
        this.setState({
          mode:"welcome"
        })
      }.bind(this)}//항상 이벤트 활성화 이후 bind 함수를 사용해야함
      >
      </Subject>
      <List
       onChangePage={function(id){
         this.setState({
          mode:"read",
          selected_content_id:Number(id)
         });
      }.bind(this)}
       data = {this.state.contents}>
       </List>
       <Control onChangeMode = {function(_mode){
         if(_mode === "delete"){
          if(window.confirm("정말 삭제하겠씁니까?")){
            let _contents = Array.from(this.state.contents)
            let i = 0;
            while(i<_contents.length)
            {
              if(_contents[i].id === this.state.selected_content_id)
              {
                _contents.splice(i,1);
                break;
              }             
              i=i+1;
            }
            this.setState({
              mode:"welcome",
              mode:_mode
            })

          }
         }else{
          this.setState({
            mode:_mode
          })

         }
       }.bind(this)}></Control>
       {this.getContent()}
      <Ahn></Ahn>
      </div>
    );
  }
}

export default App;
