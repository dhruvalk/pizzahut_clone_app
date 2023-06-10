package com.pizzahut.resourceserver.service

import com.pizzahut.resourceserver.datasource.mock.MockFoodItemDataSource
import com.pizzahut.resourceserver.model.FoodItem
import org.springframework.stereotype.Service

@Service
class MenuService(private val dataSource: MockFoodItemDataSource) {
    fun getMenu(): List<FoodItem> = dataSource.getMenu()

    fun addMenuItem(foodItem: FoodItem) = dataSource.addMenuItem(foodItem)
}