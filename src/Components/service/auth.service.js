import axios from "axios";
import { getUserInfo } from './Auth.Header';
const TOKEN = getUserInfo();

const API_URL = "http://localhost:8082/";

let axiosConfig = {
  header: {
    "Content-Type": "application/json",
    'Authorization' : TOKEN
  },
};


export const customeradd = async (name,phone,email) => {
  return axios.post(
    API_URL + "customer/customeradd",
    {
     name,email,phone
    },
    axiosConfig
  );


};

export const adminLogin = async (email, password) => {
      try{
      const response =  await axios.post (API_URL + "admin/adminLogin",{
          email,
          password
              },axiosConfig)
              if(response.data.status === 200){
                  localStorage.setItem('users',JSON.stringify(response.data));       
                  return response   
              }else{
                  return response;
              }
  }catch(e){
          return null;
  }
  
  };

export const showlist = async () => {
    return axios.get(API_URL + "customer/customerlist", axiosConfig)
    
}

export const showlistinvoice = async () => {
  return axios.get(API_URL + "invoice/invoiceget", axiosConfig)
}

export const updatecustomer = async (data,_id)=>{
  console.log(data) 
  return axios.put(
        API_URL + "customer/updatecustomer",
        {
            _id,
            name:data.name,
            phone:data.phone,
            email:data.email,      
        },
        axiosConfig
      );  
}

export const getCustomerDetail = async (id) => {
    console.log(id)
    return axios.get(API_URL + `customer/getCustomerById/${id}`, axiosConfig)
}

export const getCustomerById=async(id)=>{
  return axios.get(
    API_URL + `customer/getCustomerById/${id}`,
    axiosConfig
  );
};

export const deleteCustomer = async (_id) => {
  return await axios.delete(
      `${API_URL}customer/customerdelete/${_id}`, axiosConfig)
}


export const addInvoiceToBack= async (customer_id,customername,email,status,item,grandtotal)=>{
 
 return axios.post(
  API_URL + "invoice/addinvoice",
  {
    customer_id,
   customername,
   email,
   status,
   item,
grandtotal
  },
  axiosConfig
);
}

export const showPaidList = async () => {
  return axios.get(API_URL + "invoice/getpaid", axiosConfig)
}
export const showUnpaidList = async () => {
  return axios.get(API_URL + "invoice/getunpaid", axiosConfig)
}


export const listdata = async () => {
  return axios.get(API_URL + "admin/invoicedata", axiosConfig)
}


export const updateIvoive = async ( _id,customername,status,item,grandtotal) => {
  console.log("authservice==>",updateIvoive);
  return await axios.put(API_URL + "invoice/updateinvoice", {
      _id,
      customername,
      status,
      item,
      grandtotal
  }, axiosConfig)
}
export const deleteInvoice = async (_id) => {
  return await axios.delete(
      `${API_URL}invoice/deletinvoice/${_id}`, axiosConfig)
}
// export const getInvoiceDetail = async (id) => {
//   console.log(id)
//   return axios.get(API_URL + `invoice/invoiceDataById/${id}`, axiosConfig)
// }
export const getInvoiceDetail = async (id) => {
  console.log(id)
  return axios.get(API_URL + `invoice/getInvoiceById/${id}`, axiosConfig)
}
