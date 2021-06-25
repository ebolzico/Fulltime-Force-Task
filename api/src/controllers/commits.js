const axios= require('axios')

async function getCommits(req, res){
    let {owner, repository}= req.body
    try{
        let response= await axios.get(`https://api.github.com/repos/${owner}/${repository}/commits`)
        res.status(200).json(response.data)
    }
    catch(error){
        res.status(404).json({
        commit: {
            message: `${owner} or ${repository} not found`,
        }
    })}
}

module.exports= {getCommits}