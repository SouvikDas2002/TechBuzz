export const LoginStart=(userCredentials)=>({
    type:"Login_start"
})

export const LoginSuccess=(user)=>({
    type:"Login_Success",
    payload:user
})
export const LoginFail=()=>({
    type:"Login_failure"
})
export const Logout=()=>({
    type:"Logout"
})