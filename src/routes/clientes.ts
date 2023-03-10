/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllEntries, addEntry, getDNIEntry, deleteIdEntry, updateIdEntry } from '../services/clientesServicio'

const router = express.Router()

router.route('/')
  .get(getAllEntries)
  .post(addEntry)

router.route('/:id')
  .get(getDNIEntry)
  .delete(deleteIdEntry)
  .put(updateIdEntry)

export default router
