import express from 'express';
import { PrismaClient } from '@prisma/client';
import { notaSchema } from '../schemas/notaSchema.js';

const router = express.Router();
const prisma = new PrismaClient();

// Crear nota
router.post('/', async (req, res) => {
  try {
    const datosValidados = notaSchema.parse(req.body);
    const nuevaNota = await prisma.nota.create({
      data: datosValidados,
    });
    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las notas (excluyendo las eliminadas)
router.get('/', async (req, res) => {
  const notas = await prisma.nota.findMany({
    where: { eliminado: false },
  });
  res.json(notas);
});

// Obtener una nota por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const nota = await prisma.nota.findUnique({
    where: { id: Number(id) },
  });
  if (nota && !nota.eliminado) {
    res.json(nota);
  } else {
    res.status(404).json({ error: 'Nota no encontrada' });
  }
});

// Actualizar una nota
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const datosValidados = notaSchema.parse(req.body);
    const notaActualizada = await prisma.nota.update({
      where: { id: Number(id) },
      data: datosValidados,
    });
    res.json(notaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una nota (marcándola como eliminada)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.nota.update({
    where: { id: Number(id) },
    data: { eliminado: true },
  });
  res.status(204).send();
});

// Marcar una nota como finalizada
router.patch('/:id/finalizar', async (req, res) => {
  const { id } = req.params;
  try {
    const notaFinalizada = await prisma.nota.update({
      where: { id: Number(id) },
      data: { finalizado: true },
    });
    res.json(notaFinalizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;