// FetchIt is a universal fetch function
// takes the target url, a method, and a body
import humps from "humps";

export const fetchIt = (url, method = "GET", body = null) => {
    // declare default options object
    let options = {
      "method": method,
      "headers": { "Authorization": `Token ${localStorage.getItem("token")}` }
    }
    // switch case based on method type
    switch (method) {
      // these need content-type header key
      case "POST":
      case "PUT":
      case "PATCH":
        options.headers = {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
        break;
      default:
        break;
    }
    // adds body to request
    if (body !== null) {
      options.body = JSON.stringify(humps.decamelizeKeys(body))
    }
  
    // send request with options, convert response to json
    return fetch(url, options)
      .then(r => {
        if (method != "DELETE" && method != "PUT" && method != "PATCH") {
          return r.json()
        }
      }).then(r => {
        return  humps.camelizeKeys(r)
    })
  }