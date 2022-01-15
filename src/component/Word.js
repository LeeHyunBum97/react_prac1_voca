import { useState } from "react";

// 뜻 보기 버튼 누를 시 뜻이 보이게 하는 컴포넌트
export default function Word({word : w}) { //props로 word 받아오기_Day.js로 부터, 그리고 해당 js파일에서는 w라는 이름으로 사용
    
    const [word, setWord] = useState(w);

    const [isShow, setIsShow] = useState(false); // 뜻을 가시/비가시 하기위한 usestate사용 초기값은 false    

    const [isDone, setIsDone] = useState(word.isDone); // 외움 표시(체크박스 체크)가 된 단어에 이벤트 처리 할때 사용할 useState, 초기값 data.json파일 과 동일
    
    function toggleShow(){// 버튼이 눌렸을 때 현재 반대의 bool 값을 주어서 뜻 보기 기능 제어를 위한 함수
        setIsShow(!isShow) 
    }
    
    function toggleDone(){ 
        // setIsDone(!isDone) //외움 표시 (체크박스 체크)시 현재 반대값을 주어 외웠다는 이벤트를 제어하기 위한 함수
        fetch(`http://localhost:3002/words/${word.id}`, { // 두번째 인지값은 요청의 옵션
            method : 'PUT',
            headers : {
                'Content-Type' : 'applcation/json', // 보내는 리소스의 타입
            },
            body : JSON.stringify({ // PUT은 수정을 위한 정보를 보내는데 해당 내용을 body에 실어서 보낸다, 이때 JSON형태로 보내기 위해 Json으로 감싼다.
                ...word, //현재 data의 word에
                isDone : !isDone, //isDone속성을 반대의 bool값으로 변환 
            }),
        })
        .then(res => { //그리고 응답에 대하여
            if(res.ok){ // 응답이 ok라면
                setIsDone(!isDone); // State를 바꿔주는 것<화면에 보여지는 것>
            } // 이렇게 되면 새로고침 하여도 이전의 상태가 유지됨
        })
    }
 
    function del() { //삭제 버튼 눌렀을 때 동작하는 함수
        if(window.confirm('삭제 하시겠습니까?')){
            fetch(`http://localhost:3002/words/${word.id}`,{
                method : 'DELETE' //삭제 동작은 어떠한 정보를 받을 필요가 없음
            })
            .then(res => { // 그러나 UI에서 즉각 반영되도록
                if(res.ok){ // DELETE가 성공 했을 때
                    setWord({id:0}) // useState를 이용하여 바로 변화를 주기위해 word의 id값을 0으로 하여
                }
            })
        }
    }
    if (word.id === 0) {
        return null; // id가 0인 모든 word에 대해 null값을 반환한다.
    }
    /* <tr></tr>태그는 주석도 공백 없이 해야한다! */
    return(
        <tr className={isDone ? "off" : null}>{/* useState를 사용해야 동작시 문제가 없다. 상*/}
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone}/>{/* checkbox의 isDone이 체크 될 시 변화 함수호출 */}
            </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>{/* 뜻을 isShow값이 참일 때만 보여지게 (참고로 word.kor은 이미 true값) */}
            <td>
                <button onClick={toggleShow}>{/* 버튼이 눌렸을 때 toggleShow함수 호출 */}
                    뜻 {isShow ? "숨기기" : "보기"}{/* isShow값이 참일 때 뜻 숨기기, 거짓일 때 뜻 보기 출력 */}
                </button> 
                <button onClick={del} className="btn_del">삭제</button>{/* 삭제버튼 눌렸을 시 del()함수 호출 */}
            </td>
        </tr>
    );
}