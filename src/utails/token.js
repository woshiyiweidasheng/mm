const KEY ='bobomm_token'

const setToken=function(token){
    localStorage.setItem(KEY,token)
}


const getToken=function(){
  return localStorage.getItem(KEY)
}

const removeToken=function(){
    localStorage.removeItem(KEY)   
}

export {setToken,getToken,removeToken}