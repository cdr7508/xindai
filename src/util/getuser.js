import {getAllCookies} from '@/util/user'
function getuser(){
  let user = localStorage.getItem('userinfo')
  if(user){
    return JSON.parse(user);
  }else{
    return getAllCookies();
  }
}
export default getuser;


