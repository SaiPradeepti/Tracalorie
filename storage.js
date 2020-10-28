// Storage Controller

const StorageCtrl = (function(){

    return{
        storeItem: function(item){
            let items;
            //Check for items in ls
            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                console.log(items);
                localStorage.setItem('items',JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
})();

