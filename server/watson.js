const toneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3')

// Connect to the IBM Watson API for the Tone Analyzer service
// More informations :
//  https://cloud.ibm.com/docs/services/tone-analyzer
//  https://cloud.ibm.com/apidocs/tone-analyzer
//  https://github.com/watson-developer-cloud/node-sdk#tone-analyzer
const watson = new toneAnalyzerV3({ version: '2017-09-21' })

module.exports = watson