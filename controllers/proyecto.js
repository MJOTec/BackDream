const ProyectoServices = require('../services/proyecto.js');

module.exports = {
    getProyecto: async (req, res) => {
        const matricula = req.params.matricula;
        try {
            const proyecto = await ProyectoServices.getProyectoQuery(matricula);
            return res.status(200).json(proyecto);
        } catch (err) {
            return res.status(500).json({ message: `Error al obtener el tema. Err: ${err}` });
        }
    },

    crearProyecto: async (req, res) => {
        const { nombre, descripcion, imagen, lider_proyecto, matriculas } = req.body;

        if (!nombre || !descripcion || !imagen) {
            return res.status(400).json({ message: 'Nombre, descripción e imagen son requeridos.' });
        }

        try {
            // Paso 1: Crear el nuevo proyecto
            const nuevoProyecto = await ProyectoServices.createProyecto(nombre, descripcion, imagen, lider_proyecto);
            
            // Paso 2: Obtener el id_proyecto del proyecto recién creado
            const id_proyecto = nuevoProyecto.id_proyecto;
            
            // Paso 3: Registrar integrantes si el arreglo de matrículas no está vacío
            ProyectoServices.addLiderProyecto(id_proyecto, lider_proyecto);
            if (Array.isArray(matriculas) && matriculas.length > 0) {
                for (const matricula of matriculas) {
                    await ProyectoServices.addIntegrante(id_proyecto, matricula);
                }
            }

            return res.status(201).json({ message: 'Proyecto creado exitosamente', proyecto: nuevoProyecto });

        } catch (err) {
            return res.status(500).json({ message: `Error al crear el proyecto. Err: ${err.message}` });
        }
    }
};
