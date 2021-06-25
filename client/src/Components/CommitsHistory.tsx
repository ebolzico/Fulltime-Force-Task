import React from 'react'
import {useState} from 'react'
const axios= require('axios')

export default function CommitsHistory() {
    
    interface repoData{
        owner: string,
        repo: string,
    }

    const [repoData, setRepoData]= useState({
        owner: 'ebolzico',
        repository:'Fulltime-Force-Task'
    })
    const[commits, setCommits]= useState([])

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        let response= await axios({
            method: 'post',
            url: 'http://localhost:3001',
            data: repoData
        })
        setCommits(response.data)
    }
    
    return (
        <div>
            <h1>Here, you can type any repo owner & name to collect those commits</h1>
            <h3>By default, if you don't type any data, you can press the button and it'll show you the current page commits</h3>
            <form onSubmit={handleSubmit} >
                <input placeholder='owner' name='owner' />
                <input placeholder='repo' name='repo' />
                <input type='submit' value='Get commits' />
            </form>
            <div>
                {
                    commits.map(commit => {
                        return <h4>{commit}</h4>
                    })
                }
            </div>
        </div>
    )
}
