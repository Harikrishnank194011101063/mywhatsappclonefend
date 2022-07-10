import React,{createContext,useContext,useReducer} from "react"



export const statecontext=createContext();
export const StateProvider=({reducer,initialstate,children})=>{
    return(
<statecontext.Provider value={useReducer(reducer,initialstate)}>
  
    {children}
</statecontext.Provider>

    );
};


export const useStatevalue=()=>useContext(statecontext) 