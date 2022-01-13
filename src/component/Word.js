import { useState } from "react";

// 뜻 보기 버튼 누를 시 뜻이 보이게 하는 컴포넌트
export function Word( {word} ) { //props로 word 받아오기_Day.js로 부터
    
    const [isShow, setIsShow] = useState(false); // 뜻을 가시/비가시 하기위한 usestate사용 초기값은 false    
    function toggleShow(){// 버튼이 눌렸을 때 현재 반대의 bool 값을 주어서 뜻 보기 기능 제어를 위한 함수
        setIsShow(!isShow) 
    }
    const [isDone, setIsDone] = useState(word.isDone); // 외움 표시(체크박스 체크)가 된 단어에 이벤트 처리 할때 사용할 useState, 초기값 data.json파일 과 동일
    function toggleDone(){ //외움 표시 (체크박스 체크)시 현재 반대값을 주어 외웠다는 이벤트를 제어하기 위한 함수
        setIsDone(!isDone)
    }

    return(
        <tr className={isDone ? "off" : ""}> {/* useState를 사용해야 동작시 문제가 없다. 상*/}
            <td>
                <input type="checkbox" checked={isDone} onChange={ toggleDone }/> X{/* checkbox의 isDone이 체크 될 시 변화 함수호출 */}
            </td>
            <td>{word.eng}</td>
            <td>{ isShow && word.kor }</td> {/* 뜻을 isShow값이 참일 때만 보여지게 (참고로 word.kor은 이미 true값) */}
            <td>
                <button onClick={ toggleShow }>
                    뜻 { isShow ? "숨기기" : "보기"} {/* isShow값이 참일 때 뜻 숨기기, 거짓일 때 뜻 보기 출력 */}
                </button> {/* 버튼이 눌렸을 때 toggleShow함수 호출 */}
                <button className="btn_del">삭제</button>
            </td>
        </tr>
    );
}