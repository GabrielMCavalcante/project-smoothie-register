<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title: </label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field" v-for="(ingredient, index) in ingredients" :key="index">
                <label for="ingredient">Ingredient: </label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i 
                    class="material-icons delete" 
                    @click="deleteIngredient(ingredient)"
                >delete</i>
            </div>
            <div class="field add-ingredient" v-if="!addingIng">
                <label for="add-ingredient">
                    Add an ingredient: (TAB to add one more)
                </label>
                <input 
                    name="add-ingredient" 
                    @keydown.tab.prevent="addIngredient" 
                    v-model="another"
                >
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init.js';
import slugify from 'slugify';
export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: new String(),
            another: new String(),
            ingredients: new Array(),
            feedback: new String(),
            addingIng: false
        }
    },
    methods: {
        addSmoothie() {
            this.addingIng = true;
            this.addIngredient();
            if(this.title) {
                this.feedback = new String();
                db.collection('smoothies').add({
                    title: this.title,
                    slug: slugify(this.title, {
                        replacement: '-', 
                        remove: /[$*_+~^>()<{}'"!?\-/:@]/g,
                        lower: true
                    }),
                    ingredients: this.ingredients
                })
                .then(()=>this.$router.push({name: 'Index'}))
                .catch(err=>console.error('There has been an error: ', err));
            } else this.feedback = 'You must enter a title for the smoothie';
        },
        addIngredient() {
            if(this.another) {
                this.feedback = new String();
                this.ingredients.push(this.another);
                this.another = new String();
            } else this.feedback = 'You must enter a value to add an ingredient';
        },
        deleteIngredient(ingredient) {
            this.ingredients = this.ingredients.filter(ing=>ing!==ingredient);
        }
    }
}
</script>

<style>
    .add-smoothie {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .add-smoothie h2 {
        font-size: 2em;
        margin: 20px auto;
    }
    .add-smoothie .field {
        margin: 20px auto;
        position: relative;
    }
    .add-smoothie .delete {
        position: absolute;
        color: #aaa;
        right: 0;
        bottom: 16px;
        cursor: pointer;
    }
</style>