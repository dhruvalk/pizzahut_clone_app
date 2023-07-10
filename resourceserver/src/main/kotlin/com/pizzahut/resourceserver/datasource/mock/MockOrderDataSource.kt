package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.Order
import com.pizzahut.resourceserver.model.OrderItem
import com.pizzahut.resourceserver.model.Type
import org.springframework.stereotype.Repository

@Repository
class MockOrderDataSource {
    private val orderItemsList = mutableListOf<OrderItem>(
    )

    private val orderList = mutableListOf<Order>(

    )

    fun getOrders(): MutableList<Order> {
        return orderList
    }

    fun addOrder(order: Order){
        orderList.add(order)
    }

    fun deleteOrder(orderId : Int){
        orderList.removeAll { it.orderId == orderId }
    }

    fun updateOrder(order: Order){
        deleteOrder(order.orderId)
        addOrder(order)
    }

    fun getOrderItems(): MutableList<OrderItem>{
        return orderItemsList
    }

    fun addOrderItem(orderItem: OrderItem){
        orderItemsList.add((orderItem))
    }

    fun deleteOrderItem(orderId : Int, itemId : Int){
        orderItemsList.removeAll { it.orderId == orderId && it.itemId == itemId}
    }

    fun updateOrderItem(orderItem: OrderItem){
        deleteOrderItem(orderItem.orderId,orderItem.itemId)
        addOrderItem((orderItem))
    }
}
