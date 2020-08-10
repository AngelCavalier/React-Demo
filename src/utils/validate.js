export
    //验证密码    
    const validate_password = /^[A-Za-z0-9]{6,20}$/;
//验证邮箱
const reg_email = /^([a-zA-Z])|([0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

export function validate_email(value) {
    return reg_email.test(value)
}
