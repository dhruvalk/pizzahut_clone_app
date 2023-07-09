package com.pizzahut.resourceserver.model

data class User (
    var userId : Int,
    var firstName : String,
    var lastName : String,
    var email : String,
    var username : String,
    var password : String,
    var contactNum : Int,
    var birthday : String
)

data class LoginResponse(val user: User, val token: String)