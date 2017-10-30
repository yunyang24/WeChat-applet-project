//data not empty  --return true, data is not empty. 
function isnotempty(data) {
  return (data != null && data != "" && typeof (data) != "undefined" && data != "undefined" && data != "nil" && data != "null" && data != "NULL") ? true : false;
}
//data equels empty --return true, data is empty. 
function isempty(data) {
  return (data === null || data === "" || typeof (data) === "undefined" || data === "undefined" || data === "nil" || data === "null" || data === "NULL") ? true : false;
}
//validate email
function isemail(email) {
  return new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$', 'g').exec(email) == null ? false : true;
}
//length 6-20
function islenght6to20(data) {
  return new RegExp('^.{6,20}$', 'g').exec(data) == null ? false : true;
}
//upper case
function isuppercase(data) {
  return new RegExp('[A-Z]', 'g').exec(data) == null ? false : true;
}
//lower case
function islowercase(data) {
  return new RegExp('[a-z]', 'g').exec(data) == null ? false : true;
}
//digit
function isdigit(data) {
  return new RegExp('[0-9]', 'g').exec(data) == null ? false : true;
}
//special character
function isspecialcharacter(data) {
  return new RegExp('[`~!@#\$%\^&\*\(\)-\+_\{\}\[\]\|:;\",\.\/\<\>\\?\\]', 'g').exec(data) == null ? false : true;
}
//security password
function safepasswd(upass) {
  var difficultyround = 0;
  if (isuppercase(upass)) {
    difficultyround++;
  }
  if (islowercase(upass)) {
    difficultyround++;
  }
  if (isdigit(upass)) {
    difficultyround++;
  }
  if (isspecialcharacter(upass)) {
    difficultyround++;
  }
  if (!(islenght6to20(upass) && difficultyround >= 3)) {
    return false;
  }
  return true;
}

module.exports = {
  isnotempty: isnotempty,
  isempty: isempty,
  isemail: isemail,
  islenght6to20: islenght6to20,
  isuppercase: isuppercase,
  islowercase: islowercase,
  isdigit: isdigit,
  isspecialcharacter: isspecialcharacter,
  safepasswd: safepasswd
}