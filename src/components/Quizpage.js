export default function Quizpage(props){

    return(
        <div className="questions-container">
            <h1 id={props.id} className="quiz-question">{props.question}</h1>   
            <div className="choice-container">
                <span 
                style={{backgroundColor: props.isSubmitted===false?(props.chosenAnswer===props.choices[0]?"#D6DBF5":"white"):(props.chosenAnswer===props.choices[0]?props.correct_answer===props.choices[0]?"#94D7A2":"#F8BCBC":(props.correct_answer===props.choices[0]?"#94D7A2":"white"))}}
                onClick={()=>props.handleChoice(props.id,props.choices[0])}>{props.choices[0]}</span>
                <span 
                style={{backgroundColor: props.isSubmitted===false?(props.chosenAnswer===props.choices[1]?"#D6DBF5":"white"):(props.chosenAnswer===props.choices[1]?props.correct_answer===props.choices[1]?"#94D7A2":"#F8BCBC":(props.correct_answer===props.choices[1]?"#94D7A2":"white"))}}
                onClick={()=>props.handleChoice(props.id,props.choices[1])}>{props.choices[1]}</span>
                <span 
                style={{backgroundColor: props.isSubmitted===false?(props.chosenAnswer===props.choices[2]?"#D6DBF5":"white"):(props.chosenAnswer===props.choices[2]?props.correct_answer===props.choices[2]?"#94D7A2":"#F8BCBC":(props.correct_answer===props.choices[2]?"#94D7A2":"white"))}}
                onClick={()=>props.handleChoice(props.id,props.choices[2])}>{props.choices[2]}</span>
                <span 
                style={{backgroundColor: props.isSubmitted===false?(props.chosenAnswer===props.choices[3]?"#D6DBF5":"white"):(props.chosenAnswer===props.choices[3]?props.correct_answer===props.choices[3]?"#94D7A2":"#F8BCBC":(props.correct_answer===props.choices[3]?"#94D7A2":"white"))}}
                onClick={()=>props.handleChoice(props.id,props.choices[3])}>{props.choices[3]}</span>
            </div>
            <div className="bottom-line"></div>
        </div>
 
    )
}