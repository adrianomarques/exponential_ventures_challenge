import React from 'react'
import Typewriter from 'typewriter-effect';
import "./styles.scss"


export default function TextBox(props) {

    return (
        <>
            <Typewriter
                options={{
                    wrapperClassName: 'text_writer'
                }}
                onInit={(typewriter) => {
                    typewriter
                    .changeDelay(20)
                    .typeString(props.question)
                    .stop()
                    .start();
                }}
            />
        </>
    )
}