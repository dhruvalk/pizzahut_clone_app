package com.pizzahut.resourceserver.model


data class OrderItem(
    var itemId: Int,
    var orderId: Int,
    var quantity: Int,
    var comments: String
)



