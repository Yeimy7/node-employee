import z from "zod";

const userSchema = z.object({
  username: z
    .string({
      invalid_type_error: "El nombre de usuario deberia ser una cadena",
      required_error: "El username es requerido",
    })
    .min(3, { message: "Username deberia tener 3 caracteres o más" }),
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

export function validateUser(input) {
  return userSchema.safeParse(input);
}
export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
