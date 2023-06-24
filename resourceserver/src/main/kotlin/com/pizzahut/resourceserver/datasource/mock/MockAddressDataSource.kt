package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.Address
import org.springframework.stereotype.Repository

@Repository
class MockAddressDataSource {
    private val addressList = mutableListOf<Address>(
        Address(1,1, "123 Road", "12","none",false,"23-May-2023","23-May-2023"),
        Address(2,1, "12 Road", "12","none",true,"23-May-2023","23-May-2023"),
        Address(3,1, "3 Road", "12","none",false,"23-May-2023","23-May-2023")
    )

    fun getAddress():MutableList<Address>{
        return addressList
    }

    fun addAddress(address:Address){
        addressList.add(address)
    }

    fun updateAddress(address:Address){
        deleteAddress(address.addressId, address.userId)
        addAddress(address)
    }

    fun deleteAddress(addressId: Int, userId: Int){
        addressList.removeAll { it.addressId == addressId && it.userId == userId }
    }
}