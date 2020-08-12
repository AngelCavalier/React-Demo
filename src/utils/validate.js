//正则
export const reg_password = /^[A-Za-z0-9]{6,20}$/;
export const reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

export const validate_password = reg_password;
//验证邮箱
export function validate_email(value) {
    return reg_email.test(value)
}
//验证密码
export function validate_pass(value) {
    return reg_password.test(value)
}