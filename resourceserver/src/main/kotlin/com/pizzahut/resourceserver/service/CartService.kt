package com.pizzahut.resourceserver.service

import com.pizzahut.resourceserver.datasource.mock.MockCartDataSource
import com.pizzahut.resourceserver.model.OrderItem
import org.springframework.stereotype.Service

@Service
class CartService(private val dataSource: MockCartDataSource) {
    fun getCartByUser(userId: Int)  = dataSource.getCartByUser(userId)
    fun addItemToCart(userId: Int, item: OrderItem) = dataSource.addItemToCart(userId, item)
    fun removeItemFromCart(userId: Int, itemId: Int) = dataSource.removeItemFromCart(userId, itemId)
    fun removeCartByUser(userId: Int): Any = dataSource.removeCartByUser(userId)

}