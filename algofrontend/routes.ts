/*
* Represents routes that are authorized for every user at any moment logged in or not
* @type {string[]}
*/
export const publicRoutes = [
    '/',
]


/*
* Represents routes that are used for authentication 
* and would redirect logged in users to the settings pas
* @type {string[]}
*/
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error'
]


/*
* Represents routes that start with this are used for api authentication
* @type {string}
*/
export const apiAuthPrefix = '/api/auth'
// export const apiAuthPrefix = ''


/*
* Represents the default redirect path after a user logs in
* @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

