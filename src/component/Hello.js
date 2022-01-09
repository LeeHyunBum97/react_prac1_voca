/* const Hello = () => {
    return <p>Hello</p>;
};
export default Hello; */

import World from "./World";
import styles from "./Hello.module.css"
import { useState } from "react"; /* state사용시 필요 */
import UserName from "./UserName";

export default function Hello( { age } ) {
    function showName(){
        console.log("Mike");
    }

    function showAge(age){
        console.log(age);
    }

    function showText(e){
        console.log(e.target.value)
    }

    //let name = "Mike" // 단순 변수
    const [ name, setName ] = useState("Mike"); // state 사용을 위한 변수 <배열 구조분해형 = useState(초기값)>
    const msg = age > 19 ? "성인 입니다." : "미성년자 입니다.";

    return (
        <div>
          {/* <h1 style={{
              color: '#f00',
              borderRight: '12px solid #000',
              marginBottom: '30px',
              opacity: 1
           }
          }>Hello</h1>
          <div className={styles.box}>Hello</div> */}
          
          {/* <h1>Hello</h1>
          <button onClick={showName}>Show name</button>
          <button onClick={
              () => {
                  showAge(30);
              }
          }>Show age</button>
          <input type="text" onChange={showText}/> */}

          <h2 id="name">{name}({age}) : {msg}</h2>
          <UserName name = {name}/> {/* Hello.js에서는 name이 state이지만 UserName에게는 props(인자)에 해당한다. */}
          <button onClick={() => {
              setName(name === "Mike" ? "Jane" : "Mike");
              }}>Change</button>
        </div>
    );
}