// 영단어, 뜻, 뜻보기, 영단어 삭제 를 표시하기 위한 컴포넌트
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Day() { // 특정 DAY를 선택했을 때 당일차 단어가 나오게
  
    const {day} = useParams(); // URL에 포함된 값을 얻는다, < 사용자가 이동한  URL의 최말단 값 >
    const words = useFetch(`http://localhost:3002/words?day=${day}`)
    
    return (
     <>
        <h2>Day {day}</h2>
        {words.length === 0 && <span>Loading...</span> }{/* useFetch.js의 state초기값이 빈배열이므로 useFetch의 밑 함수가 실행 되기 전까지 Loading을 출력 */}
        <table>
            <tbody>
                {words.map(word => (
                <Word word={word} key={word.id} /> // Word.js로 Word의 id값을 key값으로 하여 Word props전달
            ))}</tbody>
        </table>
    </>
    );
}