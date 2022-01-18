// JSON서버 이용시 간단하게 REST-API사용 가능 -> 작은 프로젝트, 공부목적에 용이(back end) npm install -g json-server
/* REST API
   -> URL주소와 메서드로 
      Create, Read, Update, Delete를 요청한다
      Create : POST
      Read : GET
      Update : PUT
      Delte : DELETE 와 같이 메서드를 사용한다 
  server역할을 하는데 이에 대한 기록은 경로설정에 적은 json파일에 기록된다.
  -> json-server --watch [json파일(데이터 파일) 경로] --port [사용 포트번호]*/ 

import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //npm install react-router-dom@^5.2.0  
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" exact element={<DayList/>}/>
          <Route path="/day/:day" exact element={<Day/>}/>
          <Route path="/create_word" exact element={<CreateWord/>}/>
          <Route render={() => {<EmptyPage/>}}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;