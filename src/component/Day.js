import dummy from "../db/data.json";
import { useParams } from "react-router-dom"

export default function Day() { // 특정 DAY를 선택했을 때 당일차 단어가 나오게
     // dummy.words(db폴더의 data.json)
    
    const a = useParams(); // URL에 포함된 값을 얻는다, < 사용자가 이동한  URL의 최말단 값 >
    const day = a.day;
    const wordList = dummy.words.filter(word => (
        word.day === Number(day) // word.day의 day는 json파일의 word배열의 숫자값이므로 url값을 받아온 a.day는 숫자형이여야 한다.
    ))
    
    
     return (
     <>
        <h2>Day {day}</h2>
        <table>
            <tbody>
            {wordList.map(word => (
                <tr key={word.id}>
                    <tb>{word.eng}</tb>
                    <tb>{word.kor}</tb>
                </tr>
            ))}
            </tbody>
        </table>
    </>
     );
}