// App Controller
const App = (function(ItemCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    //Add item submit
    const itemAddSubmit = function(e){
        //Get form input from UI Controller
        const input  = UICtrl.getItemInput();
        
        //Check for name and calorie input
        if(input.name !== '' && input.calories !==''){
            //Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //Add item to UI list
            UICtrl.addListItem(newItem);

            //Add to total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Clear input fields
            UICtrl.clearInput();

        }

        e.preventDefault();
    }
    
    return {
        init: function(){
            //Fetch items from data structure
            const items = ItemCtrl.getItems();

            //Check if any items
            if(items.length === 0){
            UICtrl.hideList();
            }else{
            //Populate list with items
            UICtrl.populateItemList(items);
            }

            //Add to total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

App.init();