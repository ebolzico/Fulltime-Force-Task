const { default: axios } = require('axios');
const { Router } = require('express');
const {getCommits}= require('../controllers/commits.js')

const router= Router()

router.use('/', getCommits)

module.exports= router