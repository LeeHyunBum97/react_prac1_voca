import { useRef, useState } from "react";
import useFetch  from "../hooks/useFetch";
import { useNavigate } from "react-router";

export default function CreateWord() { //단어 입력 폼
    const days = useFetch("http://localhost:3002/days"); // 커스텀 hook인 useFetch를 이용해 json서버의 days에 해당되는 값을 저장
    
    const navigate = useNavigate(); // 저장버튼을 눌렀을 때 해당 단어가 저장된 Day페이지로 이동하기 위해서 사용하는 패키지

    const [isLoading, setIsLoading] = useState(false); // 저장버튼을 눌렀을 때 통신이 끝나기 이전에 버튼을 사용하지 못하게 하기 위해 사용

    function onSubmit(e) { //event를 인자로 받아서
        e.preventDefault();
        
        if(!isLoading){ //isLoading이 not false -> 참일때 -> loading중이아닐때 -> 통신이 끝났을 경우에만 아래 실행.

         setIsLoading(true); //isLoading을 true로 바꾸면 !isLoding = false이므로, 해당시도의 저장통신이 끝나지 않은경우 아래 실행 불가 상태로 전환됨 

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
                setIsLoading(false); // 해당시도의 저장통신이 모두 끝난후에 다시 isLoading을 false로전환하여 통신가능하게 함
            } 
        });
     }
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
                <button 
                 style={{ //isLoading상태중에는 버튼을 흐리게한다.
                    opacity: isLoading ? 0.3: 1,
                  }}
                  >
                    {isLoading ? "Saving..." : "저장"}{/* isLoading상태 일때는 Saving을 띄우고 아닐경우 저장 출력 */}
                </button>
        </form>
    );
}