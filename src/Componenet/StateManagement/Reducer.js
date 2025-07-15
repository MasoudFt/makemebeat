export const upNaveInput=(state=false,action)=>{
   switch (action.type) {
       case "input":  
    
    return !state;
      
    default:
        return state;
   }
}

export const ShowProfile=(state=null,action)=>{
    switch (action.type) {
        case "profile":  
     
     return action.payload
       
     default:
         return state;
    }
}
export const postUserId=(state=0,action)=>{
    switch (action.type) {
        case "userId2":  
            return action.payload; 
        default:
            return state; 
    }
}
export const postMusicInfo=(state="",action)=>{
    switch (action.type) {
        case "muiscInfo":  
     return action.payload
       
     default:
         return state;
    }
}
export const OneMusicInfo=(state={},action)=>{
    switch (action.type) {
        case "OneMusicInfo":  
     return action.payload
       
     default:
         return state;
    }
}
export const showMusicplayer=(state=false,action)=>{
    switch (action.type) {
        case "showMusicplayer":  
     return !state;
       
     default:
         return state;
    }
}
export const postUrlMuiscFile=(state=[],action)=>{
    switch (action.type) {
        case "postUrlMuiscFile":  
     return action.payload;
       
     default:
         return state;
    }
}

export const postProductlist = (state = { cart: [], alert: null }, action) => {
    switch (action.type) {
      case "postProductlist":
        return { ...state, cart: [...state.cart, action.payload], alert: null };
  
      case "Alret":
        return { ...state, alert: action.payload };
  
      case "UPDATE_CART": 
        return { ...state, cart: action.payload };

      default:
        return state;
    }
  };