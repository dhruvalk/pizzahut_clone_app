package com.pizzahut.resourceserver.controller

import com.pizzahut.resourceserver.datasource.mock.MockFoodItemDataSource
import com.pizzahut.resourceserver.model.*
import com.pizzahut.resourceserver.service.*
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.ExceptionHandler

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.HttpClientErrorException.NotFound

@SpringBootApplication
@ComponentScan(basePackages = ["com.pizzahut.resourceserver"])
class ResourceserverApplication

fun main(args: Array<String>) {
	runApplication<ResourceserverApplication>(*args)
}

@RestController
class MenuController(private val menuService: MenuService, private val orderService: OrderService, private val priceService: PriceService) {
    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFound(e:NoSuchElementException): ResponseEntity<String> = ResponseEntity(e.message, HttpStatus.NOT_FOUND)
    @ExceptionHandler(IllegalArgumentException::class)
    fun handleBadRequest(e: IllegalArgumentException): ResponseEntity<String> = ResponseEntity(e.message, HttpStatus.BAD_REQUEST)

    @GetMapping("/menu/all")
    fun getMenu() = menuService.getMenu()

    @GetMapping("/menu/{id}")
    fun getMenuItem(@PathVariable("id") id: Int) = menuService.getMenu().filter { it.itemID == id }


    @PostMapping("/menu/create")
    @ResponseStatus(HttpStatus.CREATED)
    fun addMenuItem(@RequestBody foodItem: FoodItem): FoodItem  = menuService.addMenuItem(foodItem)

    @PatchMapping("/menu")
    fun updateMenuItem(@RequestBody foodItem: FoodItem): FoodItem = menuService.updateMenuItem(foodItem)

    @DeleteMapping("/menu/{id}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteMenuItem(@PathVariable("id") id: Int): Unit {
        menuService.deleteMenuItem(id)
        priceService.deleteMenuItemPriceById(id)
    }

    @GetMapping("/menu")
    fun getMenuItemsFromTags(@RequestParam("tags") tags: String): List<FoodItem> = menuService.getMenuItemFromTags(tags)
}


@RestController
class PriceController(private val priceService: PriceService){

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFound(e:NoSuchElementException): ResponseEntity<String> = ResponseEntity(e.message, HttpStatus.NOT_FOUND)
    @ExceptionHandler(IllegalArgumentException::class)
    fun handleBadRequest(e: IllegalArgumentException): ResponseEntity<String> = ResponseEntity(e.message, HttpStatus.BAD_REQUEST)

    @GetMapping("/price/all")
    fun getPrices() = priceService.getPrices()

    @GetMapping("/price/id")
    fun getMenuItemPricesById(@RequestParam("itemId") itemId: Int):List<Price> = priceService.getPricesById(itemId)

    @GetMapping("/price")
    fun getMenuItemPrice(@RequestParam("itemId") itemId: Int, @RequestParam("type") type:Type): Double = priceService.getMenuItemPrice(itemId,type)

    @PostMapping("/price/create")
    @ResponseStatus(HttpStatus.CREATED)
    fun addMenuItemPrice(@RequestBody price: Price): Price = priceService.addMenuItemPrice(price)

    @PatchMapping("/price/update")
    fun updateMenuItemPrice(@RequestBody price: Price): Price = priceService.updateMenuItemPrice(price)

    @DeleteMapping("/price/{id}/{type}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteMenuItemPrice(@PathVariable("id") itemId: Int, @PathVariable("type") type: Type): Unit = priceService.deleteMenuItemPrice(itemId,type)


}
@RestController
class OrdersController(private val orderService: OrderService) {
    @GetMapping("/orders/all")
    // get all orders from orders table
    fun getAllOrders() = orderService.getOrders()

    @GetMapping("/orderItems/all")
    // get all order items from orderItems table
    fun getAllOrderItems() = orderService.getOrderItems()

    @GetMapping("/orders/{userId}/all")
    // get all orders for specified user
    fun getAllOrdersByUser(@PathVariable("userId") userId: Int) = orderService.getOrders().filter { order -> order.userId == userId }

    @GetMapping("/orderItems/{orderId}/all")
    // get all the items in the order for given orderId
    fun getAllOrderItemsByOrder(@PathVariable("orderId") orderId: Int) = orderService.getOrderItems().filter { order -> (order.orderId==orderId) }

    @PostMapping("/orders/create")
    @ResponseStatus(HttpStatus.CREATED)
    /// create a new order
    fun addNewOrder(@RequestBody order: Order): Order {
        order.orderId = orderService.getOrders().size + 1
        orderService.addOrder(order)
        return order
    }

    @PostMapping("/orderItems/create")
    @ResponseStatus(HttpStatus.CREATED)
    // add an item to order
    fun addNewOrderItem(@RequestBody orderItems: List<OrderItem>): List<OrderItem> {
        for (item in orderItems){
            if(orderService.getOrderItems().any{it.itemId == item.itemId && it.orderId == item.orderId && it.type == item.type}){
                throw IllegalArgumentException("Order item with itemId ${item.itemId} and type ${item.type} already exists in database for this particular order, this error should be handled by the frontend as the item already exists in the order, use update to increase quantity instead")
            }
            orderService.addOrderItem(item)
        }
       return orderItems
    }

    @PatchMapping("/orderItems/update")
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

    @PatchMapping("/orders/update")
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

    @DeleteMapping("orders/{orderId}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    // delete an order
    fun deleteOrder(@PathVariable("orderId") orderId: Int){
        if(orderService.getOrders().any{orderId == it.orderId}){
            orderService.deleteOrder(orderId)
        }
        else{
            throw IllegalArgumentException("Order doesnt even exist")
        }
    }

    @DeleteMapping("orderItems/{orderId}/{itemId}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    // delete an order
    fun deleteOrderItem(@PathVariable("orderId") orderId: Int, @PathVariable("itemId") itemId: Int){
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

        @GetMapping("/users/{userId}")
        fun getUserInfo(@PathVariable("userId") userId: Int): User?{
            return userService.getUsers().firstOrNull{ it.userId == userId }
        }

        @PostMapping("/users/login")
        @ResponseStatus(HttpStatus.ACCEPTED)
        fun checkAndLoginUser(@RequestBody loginBody:Map<String,String>): LoginResponse {
            val filteredUser = userService.getUsers().firstOrNull { it.email == loginBody["email"] && it.password == loginBody["password"] }
            if(filteredUser == null ){
                throw IllegalArgumentException("Email and password does not match")
            }
            else{
                // return mapOf("token" to "dhruvalisbetterthancadyintennis")
                return LoginResponse(filteredUser, "dhruvalisbetterthancadyintennis")
            }
        }

        @PatchMapping("/users/update")
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

        

        @DeleteMapping("users/{userId}/delete")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        // delete an order
        fun deleteUser(@PathVariable("userId") userId: Int){
            if(userService.getUsers().any{userId == it.userId}){
                userService.deleteUser(userId)
            }
            else{
                throw IllegalArgumentException("User doesnt even exist")
            }
        }

        @PostMapping("/users/create")
        @ResponseStatus(HttpStatus.CREATED)
        // add an item to order
        fun addNewUser(@RequestBody user: User): User {
            if(userService.getUsers().any{it.email == user.email}){
                throw IllegalArgumentException("user with that email already exists")
            }
            userService.addUser(user)
            return user
        }

    }

}

@RestController
class CartController( private val cartService: CartService){
    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFound(e:NoSuchElementException): ResponseEntity<String> = ResponseEntity(e.message, HttpStatus.NOT_FOUND)
    @ExceptionHandler(IllegalArgumentException::class)
    fun handleBadRequest(e: IllegalArgumentException): ResponseEntity<String> = ResponseEntity(e.message, HttpStatus.BAD_REQUEST)

    @GetMapping("/cart/{userId}")
    fun getCartByUser(@PathVariable("userId") userId: Int) : Cart = cartService.getCartByUser(userId)

    @PatchMapping("/cart/{userId}/addItem")
    fun addItemToCart(@PathVariable userId: Int, @RequestBody item: OrderItem) : Cart = cartService.addItemToCart(userId, item)

    @PatchMapping("/cart/{userId}/{itemId}/removeItem")
    fun removeItemFromCart(@PathVariable userId: Int, @PathVariable itemId: Int): Cart {
        return cartService.removeItemFromCart(userId, itemId)
    }

    @DeleteMapping("/cart/{userId}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun removeCartByUser(@PathVariable("userId") userId: Int) = cartService.removeCartByUser(userId)
}

@RestController
class AddressController(private val addressService: AddressService) {
    @GetMapping("/address/all")
    fun getAllAddress() = addressService.getAddress()

    @GetMapping("/address/{userId}/all")
    fun getAddressByUser(@PathVariable("userId") userId: Int): List<Address>{
        return addressService.getAddress().filter { it.userId == userId }
    }

    @PatchMapping("/address/update")
    fun updateAddress(@RequestBody address: Address):Address{
        if(addressService.getAddress().any{it.userId == address.userId && it.addressId == address.addressId}){
            addressService.updateAddress(address)
        }
        else{
            throw IllegalArgumentException("User or existing address doesnt even exist")
        }
        return address
    }

    @DeleteMapping("address/{userId}/{addressId}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteAddress(@PathVariable("addressId") addressId: Int,@PathVariable("userId") userId: Int){
        if(addressService.getAddress().any{userId == it.userId && addressId == it.addressId}){
            addressService.deleteAddress(addressId, userId)
        }
        else{
            throw IllegalArgumentException("User and address id doesnt exist")
        }
    }

    @PostMapping("/address/create")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewAddress(@RequestBody address: Address): Address {
        if(addressService.getAddress().any{it.userId == address.userId && it.addressId == address.addressId}){
            throw IllegalArgumentException("that address id already exists for that user")
        }
        addressService.addAddress(address)
        return address
    }

}