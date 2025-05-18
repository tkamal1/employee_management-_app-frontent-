import api from './Api';
import qs from 'qs'; // Import 'qs' to format the data properly

const getAdminByEmail = async email => {

 await api.post('/admin/GetEmail', {email})
 .then(res=>{
  console.log(res.data.sucsess);
  return res;
 }).catch(err=>{
  return err;
 })

  
};

export default getAdminByEmail;
