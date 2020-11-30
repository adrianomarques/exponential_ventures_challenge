import React from 'react'
import "./styles.scss"
import { useSelector } from 'react-redux'

export default function Score() {
    const score = useSelector(state => state.score)

    return (
        <>
        <div className='score'>
            SCORE: {score}
        </div>
        </>
    )
}