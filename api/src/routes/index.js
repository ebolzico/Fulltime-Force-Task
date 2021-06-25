const { default: axios } = require('axios');
const { Router } = require('express');
const {getCommits}= require('../controllers/commits.js')

const router= Router()

router.post('/', getCommits)

module.exports= router