import { isAuthenticatedUser } from "../Middleware/Auth"

const router =require("express").router()

//wishlist
router.route('/wishlist').get(isAuthenticatedUser)
router.route('/addToWishlist').post(isAuthenticatedUser)

router.route('wishlist/:id')
.delete(isAuthenticatedUser)
.put(isAuthenticatedUser)


//cart
router.route('/cart').get(isAuthenticatedUser)
router.route('/addToCart').post(isAuthenticatedUser)

router.route('cart/:id')
.delete(isAuthenticatedUser)
.put(isAuthenticatedUser)











export default router