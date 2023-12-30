
function validateRegistrationData(data) {
    const { name, email, age } = data;
  

    if (!name || !email || !age) {
      return { isValid: false, error: 'All fields are required' };
    }
  

  
    return { isValid: true };
  }
  
  module.exports = { validateRegistrationData };
  