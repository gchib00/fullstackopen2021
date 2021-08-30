/* eslint-disable no-undef */
const info = (content) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(content)
  }
}

const error = (content) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(content)
  }
}

module.exports = {
  info, error
}