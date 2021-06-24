const axios= require('axios')

function getCommits(req, res){
    let {owner, repository}= req.body
    try{
        let response= axios.get(`https://api.github.com/repos/${owner}/${repository}/commits`)
        res.status(200).json(response)
    }
    catch(error){res.json(error, 'error')}
}

module.exports= {getCommits}