package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.FoodItem
import com.pizzahut.resourceserver.model.Price
import com.pizzahut.resourceserver.model.Type
import org.springframework.stereotype.Repository

@Repository
class MockFoodItemDataSource {
    private val items = mutableListOf<FoodItem>(
        FoodItem(1,"https://picsum.photos/200","bestseller", listOf("vegetarian", "spicy"), Type.`Personal Pan`),
        FoodItem(2,"https://picsum.photos/200","new on the menu", listOf("non-vegetarian", "chicken"),Type.`Large Pan`),
        FoodItem(3,"https://picsum.photos/200","An all-time favourite. Tender chicken ham combined with sweet and succulent pineapple chunks for a taste of the good ol' days.", listOf("chef recommendation", "chicken"),Type.`Regular Pan`)
    )

    fun getMenu() : List<FoodItem>{
        return items
    }

    fun addMenuItem(foodItem: FoodItem){
        items.add(foodItem)
    }

}

@Repository
class MockPriceDataSource {
    private val prices = listOf<Price>(
        Price(1,Type.`Personal Pan`,10.55),
        Price(2,Type.`Large Pan` ,18.55),
        Price(3,Type.`Regular Pan`,12.00),
    )

}