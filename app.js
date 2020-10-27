// App Controller
const App = (function(ItemCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable submit on enter
        document.addEventListener('keypress',function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        //Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

        //Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        
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

    //Click edit item
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            let listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);
            const itemToEdit = ItemCtrl.getItemById(id);
            ItemCtrl.setCurrentItem(itemToEdit);

            //Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //Update item submit
    const itemUpdateSubmit = function(e){
        //Get item input
        const input = UICtrl.getItemInput();

        //Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateListItem(updatedItem);

        //Add to total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();
        
        e.preventDefault();
    }
    
    return {
        init: function(){

            //Clear initial state
            UICtrl.clearEditState();

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