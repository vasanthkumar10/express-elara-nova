/**
 * HTTP -> header, type, cookies, session
 * HTTPS -> above all + Secured -> encrypted
 */

// STATUS response codes

/**
 * (100 - 199) - Informational data
 * (200 - 299) - Successful information
 * (300 - 399) - Redirection
 * (400 - 499) - client side error response
 * (500 - 599) - server side error
 */

// 100 -> continue -> client should continue to send request
// http polling -> retry n number of times till you get the data
// 101 -> change the process

// 200 -> OK (success)
// 201 -> created -> new data is getting added in the server
// 202 -> acceptable
// 204 -> No content

// 300 -> not to use in industry
// 301 -> moved permanently
// 307 -> temp redirect
// 308 -> permanent redirection

// 400 - Bad request from client
// 401 - unauthorized
// 403 - forbidden
// 404 - data not found
// 408 - server timed out
// 413 - payload is too heavy
// 429 - too many requests

// 500 - Internal Server Error
// 501 - not implemented
// 502 - Bad gateway
// 503 - Server unavailable
// 504 - Gateway timedout
// 507 - Insufficient storage

// HTTP methods

// GET -> no body (query strings or params) + data are exposed on the URL
// POST -> BODY + to create new data + (private calls)
// PUT -> replace entire data(id)
// DELETE -> delete the data from the server
// PATCH -> partial update
