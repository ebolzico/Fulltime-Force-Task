import React from 'react'
import {useState} from 'react'
const axios= require('axios')

export default function CommitsHistory() {
    
    interface data{
        owner: string,
        repo: string,
        commits: {
            commit: {
                message: string,
                commiter: {
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
                        commiter: {
                            name: '',
                            date:''
                        }
                    }
                }]
            })
        }
        
    }
    
    return (
        <div>
            <h1>Here, you can type any repo owner & name to collect those commits</h1>
            <h3>By default, if you don't type any data, you can press the button and it'll show you the current page commits</h3>
            <form onSubmit={handleSubmit} >
                <input placeholder='owner' name='owner' onChange={handleChange} />
                <input placeholder='repo' name='repo' onChange={handleChange} />
                <input type='submit' value='Get commits' />
            </form>
            <div>
                {     
                    repoData.commits.map(commit => {
                        return <h4>{commit.commit.message}</h4>
                     })
                }
            </div>
        </div>
    )
}
