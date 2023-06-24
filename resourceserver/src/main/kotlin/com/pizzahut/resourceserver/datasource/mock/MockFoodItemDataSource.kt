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

    fun addMenuItem(foodItem: FoodItem): FoodItem{
        if (items.any { it.itemID == foodItem.itemID }) {
            throw IllegalArgumentException("Food item with itemID ${foodItem.itemID} already exists in database")
        }
        items.add(foodItem)
        return foodItem
    }

    fun updateMenuItem(foodItem: FoodItem): FoodItem{
        val currentFoodItem = items.firstOrNull{ it.itemID == foodItem.itemID} ?: throw NoSuchElementException("Could not find a menu item with item id ${foodItem.itemID}")
        items.remove(currentFoodItem)
        items.add(foodItem)
        return foodItem
    }

    fun deleteMenuItem(id: Int){
        val currentFoodItem = items.firstOrNull{ it.itemID == id} ?: throw NoSuchElementException("Could not find a menu item with item id $id")
        items.remove(currentFoodItem)

    }

    fun getMenuItemFromTags(tags: String) : List<FoodItem>{
        return items.filter{ item ->
            tags.split(",").all { tag -> item.tags.contains(tag)}
        }
    }

}

@Repository
class MockPriceDataSource {

    private var prices = mutableListOf<Price>(
        Price(1,Type.`Personal Pan`,10.55),
        Price(2,Type.`Large Pan` ,18.55),
        Price(3,Type.`Regular Pan`,12.00),
    )

    fun getMenuItemPrice(id: Any, type: Type): Double {
        val currentFoodItem = prices.firstOrNull{ it.itemId == id && it.type == type} ?: throw NoSuchElementException("Could not find a menu item with item id $id and type $type")
        return currentFoodItem.price
    }

    fun addMenuItemPrice(price: Price): Price {
        if (prices.any { it.itemId == price.itemId && it.type == price.type}){
            throw IllegalArgumentException("Price with itemId ${price.itemId} and type ${price.type} already exists")
        }
        prices.add(price)
        return price
    }

    fun getPrices(): List<Price>{
        return prices
    }

    fun updateMenuItemPrice(price: Price): Price {
        val currMenuItemPrice = prices.firstOrNull{it.itemId == price.itemId && it.type == price.type}?: throw NoSuchElementException("Could not find a menu item with item id ${price.itemId} and type ${price.type}")
        prices.remove(currMenuItemPrice)
        prices.add(price)
        return price
    }

    fun deleteMenuItemPrice(itemId: Int, type: Type) {
        val currMenuItemPrice = prices.firstOrNull{it.itemId == itemId && it.type == type}?: throw NoSuchElementException("Could not find a menu item with item id ${itemId} and type ${type}")
        prices.remove(currMenuItemPrice)
    }


    fun deleteMenuItemPriceById(itemId: Int){
        val currMenuItemPrices = prices.filter{it.itemId == itemId }
        if (currMenuItemPrices.isNotEmpty()){
            prices.removeAll(currMenuItemPrices)
        }

    }
}