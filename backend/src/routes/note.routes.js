const express=require ('express')

const noteController=require('../controllers/note.controller')
const verifyToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

const router=express.Router()


router.get('/', verifyToken, noteController.getNotes);

router.post('/', verifyToken, noteController.createNote);

router.put('/:id', verifyToken, noteController.updateNote);


router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  noteController.deleteNote
);

router.get(
  '/all',
  verifyToken,
  authorizeRoles('admin'),
  noteController.getAllNotes
);


module.exports=router