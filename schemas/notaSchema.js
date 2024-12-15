import { z } from 'zod';

export const notaSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido').max(100, 'El título no puede tener más de 100 caracteres'),
  contenido: z.string().min(1, 'El contenido es requerido').max(1000, 'El contenido no puede tener más de 1000 caracteres'),
  finalizado: z.boolean().optional(),
  eliminado: z.boolean().optional(),
});