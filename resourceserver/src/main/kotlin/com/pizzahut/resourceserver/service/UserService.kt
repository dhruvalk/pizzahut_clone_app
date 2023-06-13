package com.pizzahut.resourceserver.service

import com.pizzahut.resourceserver.datasource.mock.MockUserDataSource
import com.pizzahut.resourceserver.model.User
import org.springframework.stereotype.Service

@Service
class UserService (private val userDataSource: MockUserDataSource) {
    fun getUsers():MutableList<User>{
        return userDataSource.getUsers()
    }

    fun addUser(user: User)=userDataSource.addUser(user)

    fun deleteUser(userId : Int) = userDataSource.deleteUser(userId)

    fun updateUser(user: User) = userDataSource.updateUser(user)
}