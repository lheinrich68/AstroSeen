import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
    res.json({ status: 'OK!' })
})

/**TODO: A monter au fil des epics :
 * - router.use('/auth', authRoutes)              // Epic 1 -> AST-18
 * - router.use('/sessions', sessionRoutes)       // Epic 2 -> AST-26
 * - router.use('/lieux', lieuRoutes)             // Epic 3 -> AST-32
 * - router.use('/ensembles', ensembleRoutes)     // Epic 4 -> AST-36
 * - router.use('/notes', noteRoutes)             // Epic 5 -> AST-40
 * - router.use('/photos', photoRoutes)           // Epic 6 -> AST-46
 * - router.use('/cibles', cibleRoutes)           // Epic 7 -> AST-51
 * - router.use('/feed', feedRoutes)              // Epic 8 -> AST-57
 * - router.use('/calendrier', calendrierRoutes)  // Epic 9 -> AST-64
 */

export default router;