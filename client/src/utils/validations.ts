import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .email("Invaild email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
  rememberMe: yup.boolean().optional().default(false),
});

export const signupFormSchema = yup.object({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup
    .string()
    .email("Invaild Email Format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
  agreeTerms: yup.boolean().required(),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmNewPassword: yup
    .string()
    // @ts-ignore
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
