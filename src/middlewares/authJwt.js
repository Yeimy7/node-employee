import jwt from 'jsonwebtoken'
import * as config from '../config/config.js'
import Role from '../models/Role.js'
import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-auth-token']
    if (!token) return res.status(403).json({ msg: 'No se proporciona ningún token', type: 'unseen' })
    const decoded = jwt.verify(token, config.WORD_SECRET)
    req.userId = decoded.id
    const user = await User.findOne({ where: { id_user: req.userId }, attributes: { exclude: ['password'] } })
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado', type: 'error' })
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Usuario no autorizado', type: 'error' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id_user: req.userId }, attributes: { exclude: ['password'] } })
    const role = await Role.findOne({
      where: { id_role: user.id_role },
    })
    if (role.role === 'administrador') {
      next()
      return
    }
    return res.status(403).json({ msg: 'Requiere el rol de Administrador', type: 'error' })
  } catch (error) {
    res.status(401).json({ msg: 'Error en el servidor, intente nuevamente', type: 'error' })
  }
}
