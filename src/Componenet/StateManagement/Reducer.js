
const initialState = {
    isAuthenticated: false,
    user: null,
};

export  const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            
            return { ...state,isAuthenticated:true, user: action.payload, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, user: null, error: action.payload };
        case 'LOGOUT':
            return { ...state,isAuthenticated:false ,user: null };
        default:
            return state;
    }
};

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
        const updatedCartAdd = [...state.cart, action.payload];
        localStorage.setItem('cart', JSON.stringify(updatedCartAdd));
        return { ...state, cart: updatedCartAdd, alert: null };
  
      case "Alret":
        return { ...state, alert: action.payload };
  
      case "UPDATE_CART":
        // زمانی که اکشن برای به‌روزرسانی سبد فراخوانی شد، ابتدا چک می‌کنیم localStorage سبد دارد یا نه
        const userCartList = localStorage.getItem("cart");
        if (!userCartList) {
          // اگر localStorage خالی بود، سبد خرید را پاک کن
          return { ...state, cart: [] }; // وضعیت سبد خرید را به آرایه خالی تنظیم می‌کند
        }
        // اگر سبد خرید وجود داشته باشد، آن را به‌روزرسانی می‌کنیم
        localStorage.setItem('cart', JSON.stringify(action.payload));
        return { ...state, cart: action.payload };
  
      default:
        return state;
    }
  };
  