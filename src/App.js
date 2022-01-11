import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmptyPage from "./component/EmptyPage";

function App() {
  return (
  <BrowserRouter>
    <div className="APP">
      <Header/>
      <Routes>
        <Route path="/" exact element={<DayList/>}/>
        <Route path="/day/:day" exact element={<Day/>}/> {/* /day/:day로 다이나믹한 URL변경 */}
        <Route render={() => {<EmptyPage/>}}/>
      </Routes>
    </div>
  </BrowserRouter>
  );
}
//check
export default App;
