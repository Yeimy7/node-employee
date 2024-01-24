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
  genre: z.enum(["femenino", "masculino"], {
    invalid_type_error: "El genero no esta dentro de los parametros permitidos",
    required_error: "El genero es requerido",
  }),
  position: z
    .string({
      invalid_type_error: "La posicion deberia ser una cadena",
      required_error: "La posicion es requerida",
    })
    .min(3, { message: "La posicion deberia tener 3 caracteres o más" }),

  salary: z
    .number({
      invalid_type_error: "El salario debería ser un número",
      required_error: "El salario es requerido",
    })
    .min(50, { message: "El salario deberia ser mayor o igual 50" }),
  id_department: z
    .string({
      invalid_type_error: "El departamento consta de numeros y letras",
      required_error: "El departamento es requerido",
    })
    .min(10, { message: "El departamento deberia tener 10 caracteres o más" }),
});

export function validateEmployee(input) {
  return employeeSchema.safeParse(input);
}
export function validatePartialEmployee(input) {
  return employeeSchema.partial().safeParse(input);
}
