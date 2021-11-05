const suc = (res, data, message) => {
  res.render('suc', {
    data: JSON.stringify(data),
    message: JSON.stringify(message)
  })
}

const fail = (res, message) => {
  res.render('fail', {
    message: JSON.stringify(message)
  })
}

module.exports = {
  suc,
  fail
}