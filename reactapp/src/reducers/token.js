
export default function(token = "", action) {
 
    if(action.type === 'addToken') {
      var newToken = action.token;
      console.log(newToken)
      return newToken;
    } else {
      return token;
    }
    
   }