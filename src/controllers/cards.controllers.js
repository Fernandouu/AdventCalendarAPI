import {pool} from '../db.js';

export const getCards = async (req, res) => {
    const [rows] =  await pool.query('SELECT * FROM CardsCalendario')
    res.json(rows)
};

export const getOneCards = async (req, res) => {
    const [rows] =  await pool.query('SELECT * FROM CardsCalendario WHERE id_card = ?', [req.params.id] )
    if(rows.length <= 0) return res.status(404).json({message: 'Sorpresa no disponible'})
        res.json(rows[0])    
};

export const UpdateStatusCard = async (req, res) => {
    const {id} = req.params
    const[result] =  await pool.query('UPDATE CardsCalendario SET estado_card = "Abierta" WHERE id_card = ?', [ id])
    if(result.affectedRows > 0){
        res.json({message: `Sorpresa ${id} actualizada`})
    }else {
        res.status(404).json({message: 'Sorpresa no disponible'})
    }

    const [rows] =  await pool.query('SELECT * FROM CardsCalendario WHERE id_card = ?', [id] )
    console.log(rows[0])
}