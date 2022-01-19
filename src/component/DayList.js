// 각 날짜 마다의 영단어를 따로 표기 하기 위한 페이지를 만드는 컴포넌트
import { Link } from "react-router-dom"
import useFetch  from "../hooks/useFetch";

 export default function DayList() {
    const days = useFetch('http://localhost:3002/days') //커스텀hook으로 url전달
     
     if (days.length === 0) { //useFetch.js를 보면 state의 초기값 배열이 빈 배열이기 때문에 useFetch의 useEffect함수가 실행되기 전까지만 해당 if문이 동작한다.
         return <span>Loading....</span>
     } // why -> if는 참일 때만 동작하기 때문에

     return( 
        <ul className="list_day">
         {days.map(day => (
             <li key={day.id}>
                <Link to={`/day/${day.day}`}> Day {day.day}</Link>
             </li>
         ))}
        </ul>
     );
 }