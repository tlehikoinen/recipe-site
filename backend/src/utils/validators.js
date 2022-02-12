const logger = require('./logger')

const validateEmail = (email) => {
  // Doesn't allow obvious false emails, email validation is impossible to do with RegEx
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  return regex.test(email)
}

const validateUsername = (username) => {
  // Username must start with letter, and remaining body can container letters, numbers and underscores. Lenght 4-16 characters
  var regex = new RegExp(/^[A-Za-z][A-Za-z0-9_]{3,15}$/)
  return regex.test(username)
}

module.exports = {
  validateEmail,
  validateUsername }

