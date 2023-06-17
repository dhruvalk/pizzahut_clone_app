package com.pizzahut.resourceserver.controller

import com.pizzahut.resourceserver.model.FoodItem
import com.pizzahut.resourceserver.model.Order
import com.pizzahut.resourceserver.model.OrderItem
import com.pizzahut.resourceserver.model.User
import com.pizzahut.resourceserver.service.MenuService
import com.pizzahut.resourceserver.service.OrderService
import com.pizzahut.resourceserver.service.UserService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
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
class MessageController(private val menuService: MenuService, private val orderService: OrderService) {

    @GetMapping("/menu/all")
    fun getMenu() = menuService.getMenu()

    @GetMapping("/menu/")
    fun getMenuItem(@RequestParam("id") id: Int) = menuService.getMenu().filter { it.itemID == id }

    @PostMapping("/menu/add")
    @ResponseStatus(HttpStatus.CREATED)
    fun addMenuItem(@RequestBody foodItem: FoodItem): FoodItem {
        if (menuService.getMenu().any { it.itemID == foodItem.itemID }) {
            throw IllegalArgumentException("Food item with itemID ${foodItem.itemID} already exists in database")
        }
        menuService.addMenuItem(foodItem)
        return foodItem
    }
}
@RestController
class OrdersController(private val orderService: OrderService) {
    @GetMapping("/orders/all")
    // get all orders from orders table
    fun getAllOrders() = orderService.getOrders()

    @GetMapping("/orderItems/all")
    // get all order items from orderItems table
    fun getAllOrderItems() = orderService.getOrderItems()

    @GetMapping("/orders")
    // get all orders for specified user
    fun getAllOrdersByUser(@RequestParam("userId") userId: Int) = orderService.getOrders().filter { order -> order.userId == userId }

    @GetMapping("/orderItems")
    // get all the items in the order for given orderId
    fun getAllOrderItemsByOrder(@RequestParam("orderId") orderId: Int) = orderService.getOrderItems().filter { order -> (order.orderId==orderId) }

    @PostMapping("/orders/add")
    @ResponseStatus(HttpStatus.CREATED)
    /// create a new order
    fun addNewOrder(@RequestBody order: Order): Order {
        orderService.addOrder(order)
        return order
    }

    @PostMapping("/orderItems/add")
    @ResponseStatus(HttpStatus.CREATED)
    // add an item to order
    fun addNewOrderItem(@RequestBody orderItem: OrderItem): OrderItem {
        if(orderService.getOrderItems().any{it.itemId == orderItem.itemId && it.orderId == orderItem.orderId}){
            throw IllegalArgumentException("Order item with itemId ${orderItem.itemId} already exists in database for this particular order, this error should be handled by the frontend as the item already exists in the order, use update to increase quantity instead")
        }
        orderService.addOrderItem(orderItem)
        return orderItem
    }

    @PutMapping("/orderItems/update")
    @ResponseStatus(HttpStatus.ACCEPTED)
    // update an item in the order
    fun updateOrderItem(@RequestBody orderItem: OrderItem):OrderItem{
        if(orderService.getOrderItems().any{it.itemId == orderItem.itemId && it.orderId == orderItem.orderId}){
            orderService.updateOrderItem((orderItem))
        }
        else{
            throw IllegalArgumentException("Order and orderItem in order doesnt even exist")
        }
        return orderItem
    }

    @PutMapping("/orders/update")
    @ResponseStatus(HttpStatus.ACCEPTED)
    // update an order
    fun updateOrder(@RequestBody order: Order):Order{
        if(orderService.getOrders().any{it.orderId == order.orderId}){
            orderService.updateOrder(order)
        }
        else{
            throw IllegalArgumentException("Order doesnt even exist")
        }
        return order
    }

    @DeleteMapping("orders/delete")
    @ResponseStatus(HttpStatus.ACCEPTED)
    // delete an order
    fun deleteOrder(@RequestParam("orderId") orderId: Int){
        if(orderService.getOrders().any{orderId == it.orderId}){
            orderService.deleteOrder(orderId)
        }
        else{
            throw IllegalArgumentException("Order doesnt even exist")
        }
    }

    @DeleteMapping("orderItems/delete")
    @ResponseStatus(HttpStatus.ACCEPTED)
    // delete an order
    fun deleteOrderItem(@RequestParam("orderId") orderId: Int, @RequestParam("itemId") itemId: Int){
        if(orderService.getOrderItems().any{orderId == it.orderId && itemId == it.itemId}){
            orderService.deleteOrderItem(orderId, itemId)
        }
        else{
            throw IllegalArgumentException("Order item doesnt even exist")
        }
    }

    @RestController
    class UserController(private val userService: UserService) {
        @GetMapping("/users/all")
        fun getAllUsers() = userService.getUsers()

        @GetMapping("/users")
        fun getUserInfo(@RequestParam("userId") userId: Int): List<User>{
            return userService.getUsers().filter { it.userId == userId }
        }

        @PutMapping("/users/update")
        @ResponseStatus(HttpStatus.ACCEPTED)
        // update an order
        fun updateUser(@RequestBody user: User):User{
            if(userService.getUsers().any{it.userId == user.userId}){
                userService.updateUser(user)
            }
            else{
                throw IllegalArgumentException("User doesnt even exist")
            }
            return user
        }

        @DeleteMapping("users/delete")
        @ResponseStatus(HttpStatus.ACCEPTED)
        // delete an order
        fun deleteUser(@RequestParam("userId") userId: Int){
            if(userService.getUsers().any{userId == it.userId}){
                userService.deleteUser(userId)
            }
            else{
                throw IllegalArgumentException("User doesnt even exist")
            }
        }

        @PostMapping("/users/add")
        @ResponseStatus(HttpStatus.CREATED)
        // add an item to order
        fun addNewUser(@RequestBody user: User): User {
            if(userService.getUsers().any{it.userId == user.userId}){
                throw IllegalArgumentException("user with that id already exists")
            }
            userService.addUser(user)
            return user
        }

    }

}
