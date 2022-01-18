import { useRef } from "react";
import useFetch  from "../hooks/useFetch";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"

export default function CreateWord() { //단어 입력 폼
    const days = useFetch("http://localhost:3002/days"); // 커스텀 hook인 useFetch를 이용해 json서버의 days에 해당되는 값을 저장
    
    const navigate = useNavigate();

    function onSubmit(e) { //event를 인자로 받아서
        e.preventDefault();

        fetch("http://localhost:3002/words", { // 두번째 인자값은 요청의 옵션
            method: "POST",
            headers: {
                'Content-Type' : 'application/json', // 보내는 리소스의 타입
            },
            body: JSON.stringify({ // POST는 생성할 정보를 보내는데 해당 내용을 body에 실어서 보낸다, 이때 JSON형태로 보내기 위해 Json으로 감싼다.
                day: dayRef.current.value, // dayRef태그에 current속성으로 해당 태그 컴포넌트에 접근하고 값은 value에 해당 된다.
                eng: engRef.current.value, // 해당 함수는 POST이기 때문에 value에 현재 ...Ref태그의 값을 담아 전달한다. -> json서버의 words로
                kor: korRef.current.value,
                isDone: false,
            }),
        })
        .then(res => { //그리고 응답에 대하여
            if(res.ok){ // 응답이 ok라면
                alert("생성이 완료 되었습니다!") //Msg 출력
                navigate(`/day/${dayRef.current.value}`)
            } 
        });
    }

    //input창에 적힌 값들을 얻어오기 위해 사용하는 hook -> useRef : dom에 접근하게 한다 -> 어딘가에 포커스 되거나 스크롤 위치를 확인
    const dayRef = useRef(null);
    const engRef = useRef(null);
    const korRef = useRef(null);
    
    return(
        <form onSubmit={onSubmit}>{/* 저장 버튼 눌렀을 때 새로고침을 막는다 */}
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef}/>{/* engRef에 접근 */}
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef}/>{/* korRef에 접근 */}
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>{/* day값이 있는 selectlist에 접근 */}
                    {days.map(day => ( // map함수를 이용해 days의 모든 day값에 대하여 아래반복
                        <option key={day.id} value={day.day}>{/* day.id의 값을 기준으로 값을 day속성의 값으로 준다. */}
                            {day.day}{/* 반복은 days의 day속성의 day값을 나타내는 것이다. */}
                        </option>// 옵션에
                    ))}
                </select>
            </div>
                <button>저장</button>
        </form>
    );
}