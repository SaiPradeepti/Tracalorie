// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        clearBtn: '.clear-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fas fa-edit"></i>
                </a>
              </li>`;
            });

            //Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            //show list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li element
            const li = document.createElement('li');
            //Add class
            li.className = 'collection-item';
            //Add ID
            li.id = `item-${item.id}`;
            //Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fas fa-edit"></i>
            </a>`;
            //Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item){ 
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fas fa-edit"></i>
                    </a>`;
                }
            });
        },
        deleteListItem:function(id){
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems.forEach(item => item.remove());
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();