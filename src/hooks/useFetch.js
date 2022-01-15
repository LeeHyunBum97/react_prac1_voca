// 커스텀 hook만들기
import { useEffect, useState } from "react";

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