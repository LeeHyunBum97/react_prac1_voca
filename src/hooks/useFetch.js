// 커스텀 hook만들기

 /* 의존성 배열 useEffect의 두번째 인자값으로 count를 주어 해당값이 변경될 때만 첫번째 인자값인 함수 실행 
    두번째 인자값에 만약에 빈배열 []을 인자값으로 준다면 렌더링 직후 딱 한번만 진행하는 함수를 가져올 때 사용된다.
    그 종류중의 하나가 API를 불러오는 것이다.(서버연결) */

//useEffect는 어떤 상태값이 바뀌었을 때 동작하는 함수를 작성할 수 있게 한다.
import { useEffect, useState } from "react"; // useEffect도 react에서 import해오는 HOOK의 종류

export default function useFetch(url){ // 주소값을 받아와 fetch를 한다.
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url) // ``기호를 사용하여 usePrams에서 받아오는 각 day 기준의 url에 해당되는 day값을 받아온다.
         .then(res => { //그러면 res(요청)값으로
             return res.json(); // res를 반환하는데 이는 http응답이기 때문에 json으로 변환하여 반환한다.
         }) // 그러면 json으로 변환되고 promise를 반환한다.
         .then(data => {
             setData(data); //그후 data에 대하여 setDays를 호출하여 data.json에 맞게 반환한다
         });
    }, [url]);

    return data;
}