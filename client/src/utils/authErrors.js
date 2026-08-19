const FRIENDLY_SERVER_MESSAGES = {
  "All Fields Required": "Please complete every required field.",
  "all fleids Required": "Please complete every required field.",
  "Email Already Registerd": "An account with this email already exists.",
  "User Not Registered": "No account was found for this email address.",
  "Invalid Username or Password": "The email or password is incorrect.",
};

export const getAuthErrorMessage = (error, fallbackMessage) => {
  if (error?.code === "ECONNABORTED") {
    return "The request took too long. Please try again.";
  }

  if (!error?.response) {
    return "We cannot reach the account service right now. Please try again shortly.";
  }

  const serverMessage = error.response.data?.message;
  if (serverMessage && FRIENDLY_SERVER_MESSAGES[serverMessage]) {
    return FRIENDLY_SERVER_MESSAGES[serverMessage];
  }

  return serverMessage || fallbackMessage;
};
