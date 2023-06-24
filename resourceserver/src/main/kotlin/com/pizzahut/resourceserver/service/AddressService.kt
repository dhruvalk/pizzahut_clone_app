package com.pizzahut.resourceserver.service;

import com.pizzahut.resourceserver.datasource.mock.MockAddressDataSource;
import com.pizzahut.resourceserver.model.Address
import org.springframework.stereotype.Service;

@Service
class AddressService(private val addressDataSource:MockAddressDataSource) {

    fun getAddress():MutableList<Address>{
        return addressDataSource.getAddress()
    }

    fun addAddress(address: Address)=addressDataSource.addAddress(address)

    fun deleteAddress(addressId: Int, userId: Int)=addressDataSource.deleteAddress(addressId, userId)

    fun updateAddress(address: Address) = addressDataSource.updateAddress(address)
}
