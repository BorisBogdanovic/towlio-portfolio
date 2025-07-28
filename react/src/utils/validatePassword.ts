export function validatePassword(password: string): boolean {
    const minLength = /.{8,}/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[@$!%*#?&]/;

    return (
        minLength.test(password) &&
        hasLowercase.test(password) &&
        hasUppercase.test(password) &&
        hasNumber.test(password) &&
        hasSpecialChar.test(password)
    );
}
