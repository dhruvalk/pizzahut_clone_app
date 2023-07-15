package com.pizzahut.resourceserver.datasource.mock

import com.pizzahut.resourceserver.model.FoodItem
import com.pizzahut.resourceserver.model.Price
import com.pizzahut.resourceserver.model.Type
import org.springframework.stereotype.Repository

@Repository
class MockFoodItemDataSource {
    private val items = mutableListOf<FoodItem>(
        FoodItem("Smoky BBQ Salmon",1,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_c6ba6ed4-4979-48ca-a14e-6f6d7a0b580e.jpg","Limited time only! Salmon chunks, cream cheese, onions with fresh capsicums, baked on a sweet and smoky BBQ sauce.",listOf()),
        FoodItem("Cheesy Hawaiian",2,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_97eefb68-3845-4dc1-9a52-753ff368b2e9.jpg","Cheese Lovers rejoice! The elevated experience of our crowed favorite tender chicken ham combined with sweet and succulent pineapple chunks, paired with the wondrous 5 blend cheese & cream cheese.",listOf()),
        FoodItem("Hawaiian",3,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_1f633a30-ba93-450a-a93d-1ac3b25a1b54.jpg","An all-time favourite. Tender chicken ham combined with sweet and succulent pineapple chunks for a taste of the good ol' days.",listOf()),
        FoodItem("Chicken Supreme",4,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_d2762674-97b0-4713-94be-4257e479f6ba.jpg","Sink your teeth into a generous spread of savoury chicken ham, spicy chicken chunks, roasted chicken, topped with onions, capsicums and mushrooms.",listOf()),
        FoodItem("Beyond™ Supreme",5,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_8c375b5d-6873-4f1e-ac86-3199fbbd0bdb.jpg","Introducing the Beyond Meat™, made with Beyond Meat's plant based Italian Sausage Crumbles which leaves a hint of herbs and spice aroma, with capsicums, onions and mushrooms, on a bed of our signature sweet sauce. Approved by Carnivore!",listOf()),
        FoodItem("Super Supreme",6,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_896faed4-6405-4e12-9c70-ddbfaf3e3cad.jpg","Always a house favourite, combining juicy ground beef, smoky beef cabanossi sausages, beef pepperoni, chicken ham, and a luscious mix of capsicums, onions, olives, mushrooms and pineapple chunks.",listOf()),
        FoodItem("Curry Chicken",7,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_c01c5b13-4752-4547-8e26-af1af00dc0df.jpg","Italian classic meets local favourite. Spicy chicken chunks, potatoes, onions and diced tomatoes come together for an authentic flavour of rich spices.",listOf()),
        FoodItem("Meat Galore",8,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_f9abc811-3387-4870-82ac-3eb23fa15f37.jpg","The perfect meat-lover's choice. Chicken ham, pepperoni, minced beef and beef cabanossi sausages, with tomato mozzarella melt.",listOf()),
        FoodItem("Beef Pepperoni",9,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_3bd4f091-ee71-4ada-bcb1-d591b9007df6.jpg","Combining the aromatic flavour of beef pepperoni and 100% mozzarella cheese. Classic treat that’s always a great choice.",listOf()),
        FoodItem("Veggie Lover's",10,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_24a5bf59-48d3-402d-b803-cca86a1fedc8.jpg","Delightful combination of garden fresh mushrooms, onions, olives and capsicums, sweetened with pineapple chunks and diced tomatoes.",listOf()),
        FoodItem("BBQ Chunky Chic",11,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_fcb35290-038e-4307-95fe-0a740b2f889b.jpg","Spicy chicken chunks together with pineapples chunks and onions, baked on a sweet and smoky BBQ sauce.",listOf()),
        FoodItem("BBQ Beyond™",12,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_ded48bda-d480-4047-bf27-9ea83f872456.jpg","Juicy Beyond™ Meat made with Beyond Meat's plant based Italian Sausage Crumbles which leaves a hint ofherbs and spice aroma, with sweet corn, on a bed of sweet and smokey BBQ sauce!",listOf()),
        FoodItem("Cheese 'n' Chic",13,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_b8279aa6-3dd8-4c20-a01f-de84a241fb50.jpg","Roasted chicken chunks, pineapple chunks and mushrooms, with mozzarella cheese and parsley.",listOf()),
        FoodItem("Chic Ham 'n' Shroom",14,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_89a8e1f6-9849-4c39-ad9f-42a95ff9d09a.jpg","Tender chicken ham with mushrooms.",listOf()),
        FoodItem("Simply Cheese",15,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_a28600d3-7f06-4cf1-a1d2-10766da2b14c.jpg","Freshly grated cheddar and mozzarella cheese, baked with diced tomatoes in Alfredo sauce.",listOf()),
        FoodItem("Very Beefy",16,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_a06fde6d-c7fd-4908-ac0f-f19a4e57dbe7.jpg","A marriage of beef cabanossi sausages and ground beef with a hint of onion.",listOf()),
        FoodItem("BBQ Chicken",17,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_156236ab-b5fb-4ca8-8d37-bc0903977fbc.jpg","Spicy chicken chunks, chicken ham, luscious pineapple chunks with fresh capsicums, baked on a sweet and smoky BBQ sauce.",listOf()),
        FoodItem("Hawaiian Supreme",18,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_4cccc783-b043-4462-8d0b-9ce073c77a5b.jpg","Chunky chicken ham, chicken ham slices and pineapples finished with a creamy cheese drizzle.",listOf()),
        FoodItem("The Four Cheese",19,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_fdb22c83-4d5d-4c3f-993f-ca2fbd450ac9.jpg","Send your tastebuds into a cheesy frenzy with a divine combination of 4 cheeses - mozzarella, parmesan, cheddar and cream cheese.",listOf()),
        FoodItem("Truffle Shuffle",20,"https://static.phdvasia.com/sg1/menu/single/desktop_thumbnail_d53190a2-3f31-49b5-b3d1-e0f1028ffd81.jpg","Marinated truffle mushrooms, cherry tomatoes and mozzarella cheese baked on top of creamy alfredo sauce.",listOf()),
    )

    fun getMenu() : List<FoodItem>{
        return items
    }

    fun addMenuItem(foodItem: FoodItem): FoodItem{
        if (items.any { it.itemID == foodItem.itemID }) {
            throw IllegalArgumentException("Food item with itemID ${foodItem.itemID} already exists in database")
        }
        items.add(foodItem)
        return foodItem
    }

    fun updateMenuItem(foodItem: FoodItem): FoodItem{
        val currentFoodItem = items.firstOrNull{ it.itemID == foodItem.itemID} ?: throw NoSuchElementException("Could not find a menu item with item id ${foodItem.itemID}")
        items.remove(currentFoodItem)
        items.add(foodItem)
        return foodItem
    }

    fun deleteMenuItem(id: Int){
        val currentFoodItem = items.firstOrNull{ it.itemID == id} ?: throw NoSuchElementException("Could not find a menu item with item id $id")
        items.remove(currentFoodItem)

    }

    fun getMenuItemFromTags(tags: String) : List<FoodItem>{
        return items.filter{ item ->
            tags.split(",").all { tag -> item.tags.contains(tag)}
        }
    }

}

@Repository
class MockPriceDataSource {

    private var prices = mutableListOf<Price>(
        Price(1,Type.`Personal Pan`,12.00),
        Price(1,Type.`Regular Pan`,14.12),
        Price(1,Type.`Large Pan`,21.00),
        Price(2,Type.`Personal Pan`,12.76),
        Price(2,Type.`Regular Pan`,16.64),
        Price(2,Type.`Large Pan`,19.87),
        Price(3,Type.`Personal Pan`,11.32),
        Price(3,Type.`Regular Pan`,14.69),
        Price(3,Type.`Large Pan`,21.21),
        Price(4,Type.`Personal Pan`,8.6),
        Price(4,Type.`Regular Pan`,14.99),
        Price(4,Type.`Large Pan`,24.68),
        Price(5,Type.`Personal Pan`,15.45),
        Price(5,Type.`Regular Pan`,18.53),
        Price(5,Type.`Large Pan`,21.67),
        Price(6,Type.`Personal Pan`,10.57),
        Price(6,Type.`Regular Pan`,15.32),
        Price(6,Type.`Large Pan`,17.21),
        Price(7,Type.`Personal Pan`,12.72),
        Price(7,Type.`Regular Pan`,14.73),
        Price(7,Type.`Large Pan`,18.15),
        Price(8,Type.`Personal Pan`,13.81),
        Price(8,Type.`Regular Pan`,15.04),
        Price(8,Type.`Large Pan`,17.84),
        Price(9,Type.`Personal Pan`,13.6),
        Price(9,Type.`Regular Pan`,18.97),
        Price(9,Type.`Large Pan`,20.3),
        Price(10,Type.`Personal Pan`,18.14),
        Price(10,Type.`Regular Pan`,21.56),
        Price(10,Type.`Large Pan`,24.22),
        Price(11,Type.`Personal Pan`,13.89),
        Price(11,Type.`Regular Pan`,16.02),
        Price(11,Type.`Large Pan`,20.79),
        Price(12,Type.`Personal Pan`,10.38),
        Price(12,Type.`Regular Pan`,14.92),
        Price(12,Type.`Large Pan`,14.68),
        Price(13,Type.`Personal Pan`,16.02),
        Price(13,Type.`Regular Pan`,18.17),
        Price(13,Type.`Large Pan`,11.59),
       Price(14,Type.`Personal Pan`,15.74),
        Price(14,Type.`Regular Pan`,19.66),
        Price(14,Type.`Large Pan`,23.96),
        Price(15,Type.`Personal Pan`,13.31),
        Price(15,Type.`Regular Pan`,17.01),
        Price(15,Type.`Large Pan`,21.78),
        Price(16,Type.`Personal Pan`,15.53),
        Price(16,Type.`Regular Pan`,17.69),
        Price(16,Type.`Large Pan`,23.24),
        Price(17,Type.`Personal Pan`,26.66),
        Price(17,Type.`Regular Pan`,26.91),
        Price(17,Type.`Large Pan`,33.99),
        Price(18,Type.`Personal Pan`,21.96),
        Price(18,Type.`Regular Pan`,22.96),
        Price(18,Type.`Large Pan`,24.11),
        Price(19,Type.`Personal Pan`,16.22),
        Price(19,Type.`Regular Pan`,17.08),
        Price(19,Type.`Large Pan`,17.75),
        Price(20,Type.`Personal Pan`,16.12),
        Price(20,Type.`Regular Pan`,20.95),
        Price(20,Type.`Large Pan`,22.08)
    )

    fun getMenuItemPrice(id: Any, type: Type): Double {
        val currentFoodItem = prices.firstOrNull{ it.itemId == id && it.type == type} ?: throw NoSuchElementException("Could not find a menu item with item id $id and type $type")
        return currentFoodItem.price
    }

    fun getPricesById(id:Any):List<Price>{
        return prices.filter { it.itemId == id }
    }

    fun addMenuItemPrice(price: Price): Price {
        if (prices.any { it.itemId == price.itemId && it.type == price.type}){
            throw IllegalArgumentException("Price with itemId ${price.itemId} and type ${price.type} already exists")
        }
        prices.add(price)
        return price
    }

    fun getPrices(): List<Price>{
        return prices
    }

    fun updateMenuItemPrice(price: Price): Price {
        val currMenuItemPrice = prices.firstOrNull{it.itemId == price.itemId && it.type == price.type}?: throw NoSuchElementException("Could not find a menu item with item id ${price.itemId} and type ${price.type}")
        prices.remove(currMenuItemPrice)
        prices.add(price)
        return price
    }

    fun deleteMenuItemPrice(itemId: Int, type: Type) {
        val currMenuItemPrice = prices.firstOrNull{it.itemId == itemId && it.type == type}?: throw NoSuchElementException("Could not find a menu item with item id ${itemId} and type ${type}")
        prices.remove(currMenuItemPrice)
    }


    fun deleteMenuItemPriceById(itemId: Int){
        val currMenuItemPrices = prices.filter{it.itemId == itemId }
        if (currMenuItemPrices.isNotEmpty()){
            prices.removeAll(currMenuItemPrices)
        }

    }
}