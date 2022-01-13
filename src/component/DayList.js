// 각 날짜 마다의 영단어를 따로 표기 하기 위한 페이지를 만드는 컴포넌트
import dummy from "../db/data.json";
import { Link } from "react-router-dom"

 export default function DayList() {
     console.log(dummy)
     return <ul className="list_day">
         {dummy.days.map(day => (
             <li key={day.id}>
                <Link to={`/day/${day.day}`}> Day {day.day} </Link>
             </li>
         ))}
     </ul>;
 }