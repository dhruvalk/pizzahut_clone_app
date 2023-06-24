package com.pizzahut.resourceserver.model

data class Address(
    var addressId: Int,
    var userId: Int,
    var street: String,
    var houseNum: String,
    var label: String,
    var isDefault: Boolean,
    var createdTime: String,
    var modifiedDateTime: String
)