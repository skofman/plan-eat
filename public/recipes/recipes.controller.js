var app = angular.module('planeat');

app.controller('recipesController', recipes);

app.$inject = ['$http'];

function recipes($http) {
  var vm = this;

  vm.new = false;
  vm.update = false;
  vm.recipe = {};
  vm.recipe.ingridients = [];

  function resetRecipe() {
    vm.recipe.nf_serving_size_qty = 1;
    vm.recipe.nf_serving_size_unit = "recipe";
    vm.recipe.nf_serving_weight_grams = 0;
    vm.recipe.nf_calories = 0;
    vm.recipe.nf_calories_from_fat = 0;
    vm.recipe.nf_total_fat = 0;
    vm.recipe.fatdv = 0;
    vm.recipe.nf_saturated_fat = 0;
    vm.recipe.satfatdv = 0;
    vm.recipe.nf_trans_fatty_acid = 0;
    vm.recipe.transfatdv = 0;
    vm.recipe.nf_cholesterol = 0;
    vm.recipe.choldv = 0;
    vm.recipe.nf_sodium = 0;
    vm.recipe.sodiumdv = 0;
    vm.recipe.nf_total_carbohydrate = 0;
    vm.recipe.carbdv = 0;
    vm.recipe.nf_dietary_fiber = 0;
    vm.recipe.fiberdv = 0;
    vm.recipe.nf_sugars = 0;
    vm.recipe.nf_protein = 0;
    vm.recipe.nf_vitamin_a_dv = 0;
    vm.recipe.nf_vitamin_c_dv = 0;
    vm.recipe.nf_calcium_dv = 0;
    vm.recipe.nf_iron_dv = 0;
  }

  vm.populateCustom = function() {
    var custom = $http.get('http://localhost:3000/getfoods?type=food&origin=custom');
    custom.then(function(data) {
      vm.customItems = data.data;
    })
  }
  vm.populateCustom();

  vm.populateSaved = function() {
    var saved = $http.get('http://localhost:3000/getfoods?type=food&origin=api');
    saved.then(function(data) {
      vm.savedItems = data.data;
    })
  }
  vm.populateSaved();

  vm.populateRecipes = function() {
    var recipes = $http.get('http://localhost:3000/getfoods?type=recipe');
    recipes.then(function(data) {
      vm.recipes = data.data;
    })
  }
  vm.populateRecipes();

  vm.updateRecipe = function() {
    resetRecipe();
    for (var i = 0; i <  vm.recipe.ingridients.length; i++) {
      vm.recipe.nf_serving_weight_grams +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_serving_weight_grams;
      vm.recipe.nf_calories +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_calories;
      vm.recipe.nf_calories_from_fat +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_calories_from_fat;
      vm.recipe.nf_total_fat +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_total_fat;
      vm.recipe.fatdv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].fatdv;
      vm.recipe.nf_saturated_fat +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_saturated_fat;
      vm.recipe.satfatdv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].satfatdv;
      vm.recipe.nf_trans_fatty_acid +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_trans_fatty_acid;
      vm.recipe.transfatdv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].transfatdv;
      vm.recipe.nf_cholesterol +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_cholesterol;
      vm.recipe.choldv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].choldv;
      vm.recipe.nf_sodium +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_sodium;
      vm.recipe.sodiumdv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].sodiumdv;
      vm.recipe.nf_total_carbohydrate +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_total_carbohydrate;
      vm.recipe.carbdv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].carbdv;
      vm.recipe.nf_dietary_fiber +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_dietary_fiber;
      vm.recipe.fiberdv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].fiberdv;
      vm.recipe.nf_sugars +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_sugars;
      vm.recipe.nf_protein +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_protein;
      vm.recipe.nf_vitamin_a_dv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_vitamin_a_dv;
      vm.recipe.nf_vitamin_c_dv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_vitamin_c_dv;
      vm.recipe.nf_calcium_dv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_calcium_dv;
      vm.recipe.nf_iron_dv +=  vm.recipe.ingridients[i].qty *  vm.recipe.ingridients[i].nf_iron_dv;
    }
  }

  vm.clearRecipe = function() {
    vm.new = false;
    vm.recipe = {};
    vm.recipe.ingridients = [];
  }

  vm.saveRecipe = function() {
    vm.recipe.type = "recipe";
    var add = $http.post('http://localhost:3000/additem', vm.recipe);
    add.then(function(data) {
      vm.populateRecipes();
      vm.new = false;
      vm.update = true;
    })
  }

  vm.showRecipe = function(item) {
    vm.recipe = item;
    vm.new = false;
    vm.update = true;
  }

  vm.updateRecipes = function() {
    vm.update = false;
    delete vm.recipe._id;
    $http.put('http://localhost:3000/updateitem', vm.recipe);
  }

  vm.deleteRecipe = function() {
    var delUrl = 'http://localhost:3000/deleteitem/' + vm.recipe.item_id;
    var del = $http.delete(delUrl);
    del.then(function(data) {
      vm.populateRecipes();
      vm.update = false;
    })
  }
}
