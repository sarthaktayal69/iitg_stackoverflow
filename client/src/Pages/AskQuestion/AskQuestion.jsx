import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './AskQuestion.css'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
    const [ questionTitle, setQuestionTitle ] = useState('')
    const [ questionBody, setQuestionBody ] = useState('')
    const [ questionTags, setQuestionTags ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state) => (state.currentUserReducer))
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(questionTitle === ''){
            alert("Question title cannot be empty!")
        }
        else if(questionBody === ''){
            alert("Question body cannot be empty!")
        }
        else if (questionTags === ''){
            alert("Please add atleast one tag")
        }
        else dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id }, navigate))
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + "\n")
        }
    }

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a Question to the Campus Junta</h1>
                <form onSubmit={handleSubmit} >
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h3>Title</h3>
                            <p>Be specific and avoid long titles</p>
                            <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='Are there any ongoing projects for contribution in SWC?'/>
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h3>Body</h3>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea name="" id="ask-ques-body" onChange={(e) => {setQuestionBody(e.target.value)}}  cols="30" rows="10" onKeyDown={handleEnter}></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h3>Tags</h3>
                            <p>Add up to 5 tags (for multiword tags use '-' in between the words) </p>
                            <input type="text" id='ask-ques-tags'  onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (python machine-learning)'/>
                        </label>
                    </div>
                    <input type="submit" value='Post Question' className='review-btn'/>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion
