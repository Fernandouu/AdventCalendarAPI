import { pool } from '../db.js';

export const getCards = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM CardsCalendario')
    res.json(rows)
};

export const getOneCards = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM CardsCalendario WHERE id_card = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({ message: 'Sorpresa no disponible' })
    res.json(rows[0])
};

export const UpdateStatusCard = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('UPDATE CardsCalendario SET estado_card = "Abierta" WHERE id_card = ?', [id])
    if (result.affectedRows > 0) {
        res.json({ message: `Sorpresa ${id} actualizada` })
    } else {
        res.status(404).json({ message: 'Sorpresa no disponible' })
    }

    const [rows] = await pool.query('SELECT * FROM CardsCalendario WHERE id_card = ?', [id])
    console.log(rows[0])
}

export const OpenCard = async (req, res) => {
    const { id } = req.params;
    const now = new Date();

    try {
        // Verificar si ya hay una carta abierta recientemente
        const [lastOpenedCard] = await pool.query(
            'SELECT * FROM CardsCalendario WHERE estado_card = "Abierta" ORDER BY ultima_apertura DESC LIMIT 1'
        );

        if (lastOpenedCard && lastOpenedCard.ultima_apertura) {
            const diffSegundos = (now - new Date(lastOpenedCard.ultima_apertura)) / 1000; // Diferencia en segundos
            if (diffSegundos < 10) { // Cambiar a 288000 segundos (80 horas) en producción
                return res.status(400).json({
                    message: `Debes esperar ${10 - diffSegundos.toFixed(1)} segundos para abrir otra tarjeta.`,
                });
            }
        }

        // Verificar si la carta seleccionada ya está abierta
        const [card] = await pool.query('SELECT * FROM CardsCalendario WHERE id_card = ?', [id]);
        if (!card) {
            return res.status(404).json({ message: 'Sorpresa no disponible' });
        }

        if (card.estado_card === 'Abierta') {
            return res.status(400).json({ message: 'Sorpresa ya abierta.' });
        }

        // Actualizar la carta seleccionada
        await pool.query('UPDATE CardsCalendario SET estado_card = "Abierta", ultima_apertura = ? WHERE id_card = ?', [
            now,
            id,
        ]);

        return res.status(200).json({ message: `Sorpresa número ${id} abierta con éxito.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al abrir la sorpresa.' });
    }
};

