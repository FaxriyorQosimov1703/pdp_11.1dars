import {useState , useEffect,useRef} from "react";

function Timer() {


    const intervalRef = useRef ( null )
    const [timer,setTimer]= useState('00:00:00')

    function getTimeRemaining(endtime) {
        const total = Date.parse ( endtime ) - Date.parse ( new Date() );
        const seconds = Math.floor((total/1000)%60);
        const minutes = Math.floor((total/1000/60)%60)
        const hours = Math.floor((total/1000*60*60)%24)
        const days = Math.floor((total/1000*60*60*24))
        return{
            total, days, hours,minutes,seconds
        };

    }
 function starTimer(deadline){
        let {total, days, hours, minutes,seconds}=getTimeRemaining(deadline);
        if (total>=0){
            setTimer(
                (hours> 9 ? hours: '0'+ hours) + ':'+
                (minutes > 9 ? minutes : '0'+ minutes)+':'+
                (seconds > 9 ? seconds : '0'+ seconds )
            )
            }else{
            clearInterval(intervalRef.current)
        }
 }
 function clearTimer(endtime){
        setTimer('00:00:10');
        if(intervalRef.current)   clearInterval(intervalRef.current);
        const  id =setInterval(()=>{
            starTimer(endtime);
        },1000)
     intervalRef.current =id;
 }
 function getDeadlineTimer(){
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds()+10);
        return deadline;
 }
 useEffect(()=>{
     clearTimer(getDeadlineTimer());
     return ()=> {if (intervalRef.current) clearInterval(intervalRef.current)}
 },[]);

    function onClickRestBtn(){
        if(intervalRef.current) clearInterval(intervalRef.current);
        clearTimer(getDeadlineTimer())
    }
    return (
        <div className={'col-6'}>
 <h1>{timer}</h1>
            <button onClick={onClickRestBtn}>Reset</button>
        </div>
    );
}

export default Timer;
