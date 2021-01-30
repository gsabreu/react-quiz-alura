import React from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                Loading
            </Widget.Content>
        </Widget>
    );
};

function QuestionWidget ({ question, totalQuestions, questionIndex }) {
    const questionId = `question__${questionIndex}`
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>

            <img alt="Descrição"
                style= {{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />

            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <form>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`
                        return (
                            <Widget.Topic
                                as = "label"
                                htmlFor={alternativeId}
                            >
                                <input 
                                    id={alternativeIndex}
                                    name={questionId}
                                    type="radio"
                                />

                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    
                    <Button> Confirmar</Button>
                </form>

            </Widget.Content>
        </Widget>
    );
};

export default function QuizPage(){
    const screenState = 'LOADING';
    const totalQuestions = db.questions.length;
    const questionIndex = 0;
    const question = db.questions[questionIndex];
    return (
       <QuizBackground>
           <QuizContainer>
               <QuizLogo/>
               {screenState === 'QUIZ' &&  (<QuestionWidget
                    question = {question}
                    questionIndex= {questionIndex}
                    totalQuestions = {totalQuestions}
               />)}
               {screenState === 'LOADING' && <LoadingWidget/>}
           </QuizContainer>

       </QuizBackground>
    );
}