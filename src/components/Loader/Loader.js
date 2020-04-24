import React from 'react'
import "./Loader.css";

export default function Loader({loading}) {
    return <div>
    {
        loading === true?
        <div className="loader center"></div>
        :
        null
    }
    </div>
}
