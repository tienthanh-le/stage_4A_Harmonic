// Passport-ouath20 keys
// Using Google api

module.exports = {
  google_keys: {
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    clientID:
      '1092049802058-4pr5b40ku47tktq50h87d3ri1f7galj3.apps.googleusercontent.com',
    clientSecret: 'xqkg6GzYhQliY6Ct08M2LwHG',
    callbackURL: 'http://localhost:8001/auth/google/callback',
  },
};
