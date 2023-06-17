package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.User
import org.springframework.stereotype.Repository

@Repository
class MockUserDataSource {
    private val userList = mutableListOf<User>(
        User(1,"Cady","Li","imCady@gmail.com","cadylysis","password1",90234520,"12-Dec-2020"),
        User(2,"Dhruv","Kothari","imDhruv@gmail.com","dhruv123","password1",90283811,"11-Dec-2020"),
        User(3,"Jon","Tay","imJon@gmail.com","jontay999","password1",90112233,"13-Dec-2020"),
        User(4,"Yinglin","Yau","imYl@gmail.com","yayinglin","password1",99119911,"14-Dec-2020"),
    )

    fun getUsers(): MutableList<User>{
        return userList
    }

    fun addUser(user: User){
        userList.add(user)
    }

    fun updateUser(user: User){
        deleteUser(user.userId)
        addUser(user)
    }

    fun deleteUser(userId:Int){
        userList.removeAll { it.userId == userId }
    }
}