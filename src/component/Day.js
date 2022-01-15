// 영단어, 뜻, 뜻보기, 영단어 삭제 를 표시하기 위한 컴포넌트
// import dummy from "../db/data.json"; //data.json파일의 배열 속성값을 사용하기 위함
// import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Day() { // 특정 DAY를 선택했을 때 당일차 단어가 나오게
     // dummy.words(db폴더의 data.json)
    
    const {day} = useParams(); // URL에 포함된 값을 얻는다, < 사용자가 이동한  URL의 최말단 값 >
    const words = useFetch(`http://localhost:3002/words?day=${day}`)
    /* const [words, setWords] = useState([]);
      useEffect(() => {
        fetch(`http://localhost:3002/words?=${day}`) // ``기호를 사용하여 usePrams에서 받아오는 각 day 기준의 url에 해당되는 day값을 받아온다.
         .then(res => { //그러면 res(요청)값으로
             return res.json(); // res를 반환하는데 이는 http응답이기 때문에 json으로 변환하여 반환한다.
         }) // 그러면 json으로 변환되고 promise를 반환한다.
         .then(data => {
             setWords(data); //그후 data에 대하여 setDays를 호출하여 data.json에 맞게 반환한다
         })
    }, [day]) */

    return (
     <>
        <h2>Day {day}</h2>
        <table>
            <tbody>
                {words.map(word => (
                <Word word={word} key={word.id} /> // Word.js로 Word의 id값을 key값으로 하여 Word props전달
            ))}</tbody>
        </table>
    </>
    );
}