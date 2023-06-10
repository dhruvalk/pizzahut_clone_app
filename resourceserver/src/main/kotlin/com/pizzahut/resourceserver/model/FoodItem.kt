package com.pizzahut.resourceserver.model


enum class Type {
    `Regular Pan`,
    `Regular Cheesy Stuffed Crust`,
    `Regular San Francisco Style Sourdough`,
    `Personal Pan`,
    `Personal Cheesy Stuffed Crust`,
    `Large Pan`,
    `Large Cheesy Stuffed Crust`,
    `Large San Francisco Style Sourdough`,
}
data class FoodItem(var itemID: Int, var photo: String, var description: String, var tags: List<String>, val type: Type)



