package com.pizzahut.resourceserver.service

import com.pizzahut.resourceserver.datasource.mock.MockFoodItemDataSource
import com.pizzahut.resourceserver.datasource.mock.MockPriceDataSource
import com.pizzahut.resourceserver.model.FoodItem
import com.pizzahut.resourceserver.model.Price
import com.pizzahut.resourceserver.model.Type
import org.springframework.stereotype.Service

@Service
class MenuService(private val dataSource: MockFoodItemDataSource) {
    fun getMenu(): List<FoodItem> = dataSource.getMenu()

    fun addMenuItem(foodItem: FoodItem): FoodItem = dataSource.addMenuItem(foodItem)

    fun updateMenuItem(foodItem: FoodItem): FoodItem = dataSource.updateMenuItem(foodItem)

    fun deleteMenuItem(id: Int) = dataSource.deleteMenuItem(id)

    fun getMenuItemFromTags(tags: List<String>) : List<FoodItem> = dataSource.getMenuItemFromTags(tags)
}

@Service
class PriceService(private val dataSource: MockPriceDataSource){
    fun getMenuItemPrice(id: Any, type: Type): Double  = dataSource.getMenuItemPrice(id,type)
    fun addMenuItemPrice(price: Price): Price = dataSource.addMenuItemPrice(price)
    fun getPrices() = dataSource.getPrices()
    fun updateMenuItemPrice(price: Price): Price = dataSource.updateMenuItemPrice(price)
    fun deleteMenuItemPrice(itemId: Int, type: Type) = dataSource.deleteMenuItemPrice(itemId,type)

}