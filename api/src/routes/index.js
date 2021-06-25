const { default: axios } = require('axios');
const { Router } = require('express');
const {getCommits}= require('../controllers/commits.js')

const router= Router()

router.get('/', getCommits)

module.exports= router