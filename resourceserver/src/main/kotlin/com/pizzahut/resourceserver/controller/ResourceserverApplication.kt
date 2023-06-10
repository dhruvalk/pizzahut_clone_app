package com.pizzahut.resourceserver.controller

import com.pizzahut.resourceserver.model.FoodItem
import com.pizzahut.resourceserver.service.MenuService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.http.HttpStatus

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
@ComponentScan(basePackages = ["com.pizzahut.resourceserver"])
class ResourceserverApplication

fun main(args: Array<String>) {
	runApplication<ResourceserverApplication>(*args)
}

@RestController
class MessageController(private val menuService: MenuService) {

    @GetMapping("/menu/all")
    fun getMenu() = menuService.getMenu()

    @GetMapping("/menu/")
    fun getMenuItem(@RequestParam("id") id: Int) = menuService.getMenu().filter { it.itemID == id }

    @PostMapping("/menu/add")
    @ResponseStatus(HttpStatus.CREATED)
    fun addMenuItem(@RequestBody foodItem: FoodItem) : FoodItem {
        if (menuService.getMenu().any{ it.itemID == foodItem.itemID }){
            throw IllegalArgumentException("Food item with itemID ${foodItem.itemID} already exists in database")
        }
        menuService.addMenuItem(foodItem)
        return foodItem
    }

}