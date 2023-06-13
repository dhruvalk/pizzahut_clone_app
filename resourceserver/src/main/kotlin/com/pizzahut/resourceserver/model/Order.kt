package com.pizzahut.resourceserver.model


data class Order(
    var orderId : Int,
    var addressId : Int,
    var userId : Int,
    var orderDateTime: String,
    var totalAmount: Double,
    var orderStatus : String,
    var orderType: String
)



