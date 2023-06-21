export const getUserInfo = () => {
    let users = localStorage.getItem("users");
    users = (JSON.parse(users));
   return users;
}