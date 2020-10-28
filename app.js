// const { UI } = require("winjs");

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
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

        //Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

        //Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        
        //Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //Clear button event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
        
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

            //Store in localStorage
            StorageCtrl.storeItem(newItem);

            //Clear input fields
            UICtrl.clearInput(newItem);

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

    //Delete button event
    const itemDeleteSubmit = function(e){
        //Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        //Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        //Add to total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //Clear items event
    const clearAllItemsClick = function(){
        //Delete all items from data strucutre
        ItemCtrl.clearAllITems();

        //Delete all items from UI
        UICtrl.removeItems();

        //Add to total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Hide UL
        UICtrl.hideList();

        //Clear state
        UICtrl.clearEditState();
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

})(ItemCtrl, StorageCtrl, UICtrl);

App.init();