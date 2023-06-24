package com.pizzahut.resourceserver.model

import java.time.LocalDateTime

data class Cart ( val userId: Int, val addedDateTime: LocalDateTime, val items: List<OrderItem>)