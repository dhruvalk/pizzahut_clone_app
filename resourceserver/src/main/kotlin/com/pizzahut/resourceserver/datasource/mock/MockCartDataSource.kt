package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.Cart
import com.pizzahut.resourceserver.model.OrderItem
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
class MockCartDataSource {

    private val cartList = mutableListOf<Cart>(
        Cart( 1, LocalDateTime.now(), listOf<OrderItem>(
            OrderItem(1, 1, 1, "no mushrooms please"),
            OrderItem(2, 1, 2, ""),
        )),
        Cart(2, LocalDateTime.of(2023, 6, 17, 10, 30, 0), listOf( OrderItem(3,2,1, ""),
            OrderItem(6,2,1, "less spicy"))
    ),
        Cart(3,LocalDateTime.of(2023, 2, 11, 8, 30, 0), listOf(OrderItem(2,1,2, ""),
            OrderItem(3,1,1, "no milk please"),
            OrderItem(4,2,1, ""),
            OrderItem(5,2,1, ""),) )
    )

    fun getCartByUser(userId: Int): Cart {
        return cartList.firstOrNull{it.userId == userId}?: throw NoSuchElementException("Could not find a cart with user id $userId")
    }

    fun addItemToCart(userId: Int, item: OrderItem): Cart {
        val currentCart = cartList.firstOrNull { it.userId == userId }
            ?: throw NoSuchElementException("Could not find a cart with cart id $userId")
        val newItems = currentCart.items.toMutableList()
        newItems.add(item)
        cartList.remove(currentCart)
        val newCart = Cart(currentCart.userId, currentCart.addedDateTime, newItems)
        cartList.add(newCart)
        return newCart
    }

    fun removeItemFromCart(userId: Int, itemId: Int): Cart {
        val currentCart = cartList.firstOrNull { it.userId == userId }
            ?: throw NoSuchElementException("Could not find a cart with cart id $userId")
        val newItems = currentCart.items.toMutableList()
        newItems.removeIf{it.itemId == itemId}
        cartList.remove(currentCart)
        val newCart = Cart(currentCart.userId, currentCart.addedDateTime, newItems)
        cartList.add(newCart)
        return newCart
    }

    fun removeCartByUser(userId: Int) {
        val cart = cartList.firstOrNull{it.userId == userId}?:throw NoSuchElementException("Could not find a user $userId's cart ")
        cartList.remove(cart)
    }
}