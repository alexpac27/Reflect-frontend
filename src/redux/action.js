import {moodLogConverter} from '../helpers/HelperMethods'

export const getArticles = (dispatch) => {
    return function(dispatch){
        fetch("http://localhost:3000/api/v1/articles")
        .then(resp =>resp.json())
        .then(data => dispatch({type: "fetched articles", payload: data}))
    }
}

export const getLogs = (dispatch) => {
    return function(dispatch){
        fetch("http://localhost:3000/api/v1/logs")
        .then(resp =>resp.json())
        .then(data => dispatch({type: "fetched logs", payload: data}))
    }
}

export const getJournals = (dispatch) => {
    return function(dispatch){
        fetch("http://localhost:3000/api/v1/journals")
        .then(resp =>resp.json())
        .then(data => dispatch({type: "fetched journals", payload: data}))
    }
}

export const postJournal = (state, dispatch) => {
    return function(dispatch){
        fetch("http://localhost:3000/api/v1/journals",{
            method: "POST",
            headers: {
                "content-type":"application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                journal: {
                    user_id: 1,
                    prompt: state.prompt,
                    resp1: state.input1,
                    resp2: state.input2,
                    resp3:state.input3
                }
            })
        })
        .then(resp =>resp.json())
        .then(data => dispatch({type: "fetched journals", payload: data}))
    }
}

export const renderFav = (idObj, state) => {
    if (state){
        return function(dispatch){
            fetch("http://localhost:3000/api/v1/favorites",{
                method: "POST",
                headers: {
                    "content-type":"application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    favorite:
                        {user_id: 1,
                        article_id: idObj
                    }
                })
            })
            .then(resp =>resp.json())
            .then(data => dispatch({type: "favorite articles", payload: data})) 
        }
    } else {
        return function(dispatch){
            fetch(`http://localhost:3000/api/v1/favorites/${idObj}`,{
                method: "DELETE"
            })
            .then(resp =>resp.json())
            .then(data => dispatch({type: "favorite articles", payload: data})) //
        }
    }  
}

export const fetchFavs = (dispatch) => {
    return function(dispatch){
        fetch("http://localhost:3000/api/v1/favorites")
        .then(resp =>resp.json())
        .then(data => dispatch({type: "fetched favorites", payload: data}))
    }
}

export const changeEntry = (idObj) => {
   
    return function(dispatch){
        fetch(`http://localhost:3000/api/v1/journals/${idObj}`,{
            method: "DELETE"
        })
        .then(resp =>resp.json())
        .then(data => dispatch({type: "remove journal", payload: data})) 
    }
}

export const deleteMood = (idObj) => {
    console.log("in action for deleting mood", idObj)
   
    return function(dispatch){
        fetch(`http://localhost:3000/api/v1/logs/${idObj}`,{
            method: "DELETE"
        })
        .then(resp =>resp.json())
        .then(data => dispatch({type: "remove mood", payload: data})) 
    }
}

export const submitLog = (state) => {
    const obj = moodLogConverter(state)
    console.log("returned object from converter helper", obj)

    if (state.request === "add"){
        return function(dispatch){
            fetch("http://localhost:3000/api/v1/logs",{
                method: "POST",
                headers: {
                    "content-type":"application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    log:
                        {user_id: 1,
                        mood_id: obj.mood,
                        tag1: obj.tag1,
                        tag2: obj.tag2,
                        tag3: obj.tag3,
                        tag4: obj.tag4,
                        tag5: obj.tag5,
                    }
                })
            })
            .then(resp =>resp.json())
            .then(data => dispatch({type: "add mood log", payload: data})) 
        }
    } 
}
