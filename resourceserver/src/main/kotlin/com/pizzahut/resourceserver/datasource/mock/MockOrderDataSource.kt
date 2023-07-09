package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.Order
import com.pizzahut.resourceserver.model.OrderItem
import com.pizzahut.resourceserver.model.Type
import org.springframework.stereotype.Repository

@Repository
class MockOrderDataSource {
    private val orderItemsList = mutableListOf<OrderItem>(
        OrderItem(1,1,1, "no mushrooms please", Type.`Large Pan`),
        OrderItem(2,1,2, "", Type.`Large Pan`),
        OrderItem(3,1,1, "no milk please", Type.`Large Pan`),
        OrderItem(3,2,1, "", Type.`Large Pan`),
        OrderItem(3,2,1, "", Type.`Large Pan`),
        OrderItem(3,2,1, "less spicy", Type.`Large Pan`),
        OrderItem(3,2,1, "no egg", Type.`Large Pan`),
    )

    private val orderList = mutableListOf<Order>(
        Order(1,1,1,"10-Jun-2023",23.11,"Ordered","Delivery"),
        Order(2,1,1,"10-Jun-2023",33.11,"Ordered","Delivery")
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
