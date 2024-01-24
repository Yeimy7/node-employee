import z from "zod";

const authSchema = z.object({
  email: z
    .string({
      invalid_type_error: "El email deberia ser una cadena",
      required_error: "El email es requerido",
    })
    .email({ message: "email invalido" }),
  password: z
    .string({
      invalid_type_error: "El password debe ser alfanumerico",
      required_error: "El password es requerido",
    })
    .min(6, { message: "El password debe ser mínimo de 6 caracteres" }),
});

const newPassAuthSchema = z.object({
  password: z
    .string({
      invalid_type_error: "El password debe ser alfanumerico",
      required_error: "El password es requerido",
    })
    .min(6, { message: "El password debe ser mínimo de 6 caracteres" }),
  newPassword: z
    .string({
      invalid_type_error: "El nuevo password debe ser alfanumerico",
      required_error: "El nuevo password es requerido",
    })
    .min(6, { message: "El nuevo password debe ser mínimo de 6 caracteres" }),
});
export function validateAuth(input) {
  return authSchema.safeParse(input);
}
export function validateNewPassAuth(input) {
  return newPassAuthSchema.safeParse(input);
}
export function validatePartialAuth(input) {
  return authSchema.partial().safeParse(input);
}