package com.pizzahut.resourceserver.service

import com.pizzahut.resourceserver.datasource.mock.MockOrderDataSource
import com.pizzahut.resourceserver.model.Order
import com.pizzahut.resourceserver.model.OrderItem
import org.springframework.stereotype.Service

@Service
class OrderService(private val dataSource: MockOrderDataSource) {
    fun getOrders(): MutableList<Order> {
        return dataSource.getOrders()
    }

    fun getOrderItems(): MutableList<OrderItem>{
        return dataSource.getOrderItems()
    }

    fun addOrder(order: Order) = dataSource.addOrder(order)

    fun addOrderItem(orderItem: OrderItem) = dataSource.addOrderItem(orderItem)

    fun deleteOrder(orderId : Int) = dataSource.deleteOrder(orderId)

    fun deleteOrderItem(orderId: Int, itemId: Int) = dataSource.deleteOrderItem(orderId, itemId)

    fun updateOrder(order: Order) = dataSource.updateOrder(order)

    fun updateOrderItem(orderItem: OrderItem) = dataSource.updateOrderItem(orderItem)
}