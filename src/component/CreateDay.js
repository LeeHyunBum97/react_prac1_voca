import React from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from "react-router"

function CreateDay(){
    const days = useFetch("http://localhost:3002/days")
    const navigate = useNavigate();

    function addDay(){
        fetch("http://localhost:3002/days", { // 두번째 인자값은 요청의 옵션
            method: "POST",
            headers: {
                'Content-Type' : 'application/json', // 보내는 리소스의 타입
            },
            body: JSON.stringify({ // POST는 생성할 정보를 보내는데 해당 내용을 body에 실어서 보낸다, 이때 JSON형태로 보내기 위해 Json으로 감싼다.
                day: days.length + 1 // 현재날짜의 개수 +1인 Day를 추가하는 것
            }),
        })
        .then(res => { //그리고 응답에 대하여
            if(res.ok){ // 응답이 ok라면
                alert("생성이 완료 되었습니다!") //Msg 출력
                navigate(`/`); // Day추가 완료시 첫 번째 페이지로
            } 
        });
    }
    return (
        <div>
            <h3>현재 일수 : {days.length}일</h3>
            <button onClick={addDay}>Day추가</button>
        </div>
    )
}

export default CreateDay
