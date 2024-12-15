import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const notas = [
    { titulo: 'Diseñar un header', contenido: 'Crear un header con HTML y CSS, incluyendo logo y menú de navegación.' },
    { titulo: 'Crear un footer', contenido: 'Diseñar un footer con enlaces y redes sociales usando HTML y CSS.' },
    { titulo: 'Estilizar botones', contenido: 'Agregar estilos personalizados a botones usando CSS.' },
    { titulo: 'Configurar un grid', contenido: 'Crear una cuadrícula de elementos usando CSS Grid Layout.' },
    { titulo: 'Añadir transiciones', contenido: 'Aplicar transiciones CSS a botones al hacer hover.' },
    { titulo: 'Implementar un formulario', contenido: 'Diseñar un formulario con inputs, etiquetas y botones.' },
    { titulo: 'Configurar tipografía', contenido: 'Aplicar fuentes y tamaños usando Google Fonts y CSS.' },
    { titulo: 'Crear un sidebar', contenido: 'Diseñar un menú lateral responsivo con CSS y HTML.' },
    { titulo: 'Diseñar tarjetas', contenido: 'Crear tarjetas de contenido usando CSS para productos o servicios.' },
    { titulo: 'Construir una galería', contenido: 'Hacer una galería de imágenes responsiva con HTML y CSS.' },
    { titulo: 'Diseñar un hero', contenido: 'Crear una sección de hero con fondo, título y subtítulo.' },
    { titulo: 'Aplicar flexbox', contenido: 'Utilizar CSS Flexbox para alinear elementos en un contenedor.' },
    { titulo: 'Implementar una barra de búsqueda', contenido: 'Diseñar una barra de búsqueda con iconos e interacciones.' },
    { titulo: 'Estilos de enlaces', contenido: 'Personalizar enlaces con colores y efectos hover en CSS.' },
    { titulo: 'Crear un layout responsivo', contenido: 'Diseñar un layout que se adapte a diferentes dispositivos.' },
  ];

  for (const nota of notas) {
    await prisma.nota.create({
      data: {
        titulo: nota.titulo,
        contenido: nota.contenido,
        finalizado: false,
        eliminado: false,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
