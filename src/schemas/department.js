import z from "zod";

const departmentSchema = z.object({
  department_name: z
    .string({
      invalid_type_error: "El nombre del departamento deberia ser una cadena",
      required_error: "El nombre de departamento es requerido",
    })
    .min(2, {
      message: "El nombre de departamento deberia tener 2 caracteres o más",
    }),
  description: z
    .string({
      invalid_type_error: "La descripción deberia ser una cadena",
    })
    .optional(),
});

export function validateDepartment(input) {
  return departmentSchema.safeParse(input);
}
export function validatePartialDepartment(input) {
  return departmentSchema.partial().safeParse(input);
}
