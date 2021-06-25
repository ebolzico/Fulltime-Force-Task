import React from 'react'
import {useState} from 'react'
import s from './CommitsHistory.module.css'
const axios= require('axios')


export default function CommitsHistory() {
    
    interface data{
        owner: string,
        repo: string,
        commits: {
            commit: {
                message: string,
                committer: {
                    name: string,
                    date: string,
                }
            }
        }[],
    }
    

    const [repoData, setRepoData]= useState<data>({
        owner: 'ebolzico',
        repo:'Fulltime-Force-Task',
        commits: [],
    })

    const [flag, setFlag]= useState(false)

    function handleChange(e: React.FormEvent<HTMLInputElement>){
        if (e.currentTarget.value === ''){
            setRepoData({
                ...repoData,
                owner: 'ebolzico',
                repo:'Fulltime-Force-Task',
            })
        } else {
            setRepoData({
                ...repoData,
                [e.currentTarget.name]: [e.currentTarget.value]
            })
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        setFlag(true)
        setRepoData({
            ...repoData,
            commits: []
        })
        let body= {
            owner: repoData.owner,
            repository: repoData.repo
        }
        try{
            let response= await axios({
                method: 'post',
                url: 'http://localhost:3001',
                data: body
            })  
            setRepoData({
                ...repoData,
                commits: response.data
            })
        }
        catch(error){
            setRepoData({
                ...repoData,
                commits: [{
                    commit:{
                        message: 'Owner or repo not found',
                        committer: {
                            name: 'None',
                            date:'Right now'
                        }
                    }
                }]
            })
        }
        
    }
    
    return (
        <div className={s.container}>
            <div className={s.data}>
                <div className={s.info}>
                    <span>By default, if you don't type any data, you can press the button and it'll show you the current page commits. But if you type an owner and repo name, it will show the repo's full commit list.</span>
                </div>
                <form onSubmit={handleSubmit} >
                    <input placeholder='Owner' name='owner' onChange={handleChange} />
                    <input placeholder='Repo' name='repo' onChange={handleChange} />
                    <input className={s.btn} type='submit' value='Get commits' />
                </form>
            </div>
            <div className={s.historyContainer}>
                <h1>Commits list:</h1>
                {   
                    flag ?  
                    repoData.commits.length > 0 ? 
                        repoData.commits.map(commit => {
                            return (
                                <div className={s.card}>
                                    <p><b>Date:</b> {commit.commit.committer.date}</p>
                                    <ul>
                                        <li><b>Commited by:</b> {commit.commit.committer.name}</li>
                                        <li><b>Message:</b> <span className={s.message}>"{commit.commit.message}"</span></li>
                                    </ul>    
                                </div>
                            )
                        })
                     : <h3>Loading...</h3>
                     :''
                }
            </div>
        </div>
    )
}
