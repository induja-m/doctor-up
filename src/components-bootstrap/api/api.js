import axios from 'axios'
//baseurl which is common for all api calls
const baseUrl = "http://localhost:3003";

export const getData = (url,options = {}) =>{
    return axios.get(`${baseUrl}/${url}`);
}

// export const postData = (url,postObj={}, options = {}) =>{
//     return axios.post(`${baseUrl}/${url}`, postObj);
// }

export const postData =(url,postObj)=>{  
    return axios({
        method: 'post', 
        url: `${baseUrl}${url}`,
        data: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
      })
}

export const deleteData = (url,options = {}) =>{
    return axios.delete(`${baseUrl}/${url}`);
}

export const putData =(url,putObj)=>{  
    // console.log("url",url)
    return axios({
        method: 'put', 
        url: `${baseUrl}/${url}`,
        data: JSON.stringify(putObj),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
      })
}
