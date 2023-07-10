package com.pizzahut.resourceserver.model


data class OrderItem(
    var itemId: Int,
    var title: String,
    var orderId: Int,
    var quantity: Int,
    var comments: String,
    var type: Type
)



