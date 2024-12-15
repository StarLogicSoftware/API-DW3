import express from "express"
import notasRoutes from "./routes/notasRoutes.js"
import { logger } from "./middleware/logger.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(logger)

// Ruta principal que devuelve un HTML explicando el uso de la API
app.get("/", (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API de Notas - Documentación</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #333; }
            h2 { color: #666; }
            code { background-color: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <h1>API de Notas - Documentación</h1>
        <p>Esta API permite gestionar notas con las siguientes operaciones:</p>
        <h2>Endpoints:</h2>
        <ul>
            <li><code>GET /api/notas</code>: Obtener todas las notas no eliminadas</li>
            <li><code>GET /api/notas/:id</code>: Obtener una nota específica por ID</li>
            <li><code>POST /api/notas</code>: Crear una nueva nota</li>
            <li><code>PUT /api/notas/:id</code>: Actualizar una nota existente</li>
            <li><code>DELETE /api/notas/:id</code>: Marcar una nota como eliminada</li>
            <li><code>PATCH /api/notas/:id/finalizar</code>: Marcar una nota como finalizada</li>
        </ul>
        <h2>Ejemplo de uso:</h2>
        <p>Para crear una nueva nota, envía una solicitud POST a <code>/api/notas</code> con el siguiente cuerpo JSON:</p>
        <pre><code>
{
  "titulo": "Mi primera nota",
  "contenido": "Este es el contenido de mi primera nota"
}
        </code></pre>
        <p>La API devolverá la nota creada con su ID y timestamps.</p>
    </body>
    </html>
  `)
})

app.use("/api/notas", notasRoutes)

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

export default app