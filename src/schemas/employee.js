import z from "zod";

const employeeSchema = z.object({
  names: z
    .string({
      invalid_type_error: "El nombre deberia ser una cadena",
      required_error: "El nombre es requerido",
    })
    .min(2, { message: "El nombre deberia tener 2 caracteres o más" }),
  last_names: z
    .string({
      invalid_type_error: "El apellido deberia ser una cadena",
      required_error: "El apellido es requerido",
    })
    .min(2, { message: "El apellido deberia tener 2 caracteres o más" }),
  ci: z
    .string({
      invalid_type_error: "El ci consta de numeros y letras",
      required_error: "El ci es requerido",
    })
    .min(5, { message: "El ci deberia tener 5 caracteres o más" }),
});

export function validateEmployee(input) {
  return employeeSchema.safeParse(input);
}
export function validatePartialEmployee(input) {
  return employeeSchema.partial().safeParse(input);
}
