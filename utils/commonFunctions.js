const generatePassword = (email) => {
    const namePart = email.split("@")[0]; // Extract name before '@'
    return `medi@${namePart}`;
  };
  
  module.exports = generatePassword;
  
  