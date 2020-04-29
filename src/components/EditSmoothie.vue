<template>
    <div v-if="smoothieTitle" class="edit-smoothie container">
        <h2>Editting {{smoothieTitle}} Smoothie</h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title: </label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field" v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <label for="ingredient">Ingredient: </label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
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
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init.js';
import slugify from 'slugify';
export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: new Object(),
            smoothieTitle: new String(),
            another: null,
            feedback: new String(),
            addingIng: false
        }
    },
    methods: {
        editSmoothie() {
            this.addingIng = true;
            this.addIngredient();
            if(this.smoothie.title) {
                this.feedback = new String();
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    slug: slugify(this.smoothie.title, {
                        replacement: '-', 
                        remove: /[$*_+~^>()<{}'"!?\-/:@]/g,
                        lower: true
                    }),
                    ingredients: this.smoothie.ingredients
                })
                .then(()=>this.$router.push({name: 'Index'}))
                .catch(err=>console.error('There has been an error: ', err));
            } else this.feedback = 'You must enter a title for the smoothie';
        },
        addIngredient() {
            if(this.another) {
                this.feedback = new String();
                this.smoothie.ingredients.push(this.another);
                this.another = new String();
            } else this.feedback = 'You must enter a value to add an ingredient';
        },
        deleteIngredient(ingredient) {
            this.smoothie.ingredients = this.smoothie.ingredients
                                            .filter(ing=>ing!==ingredient);
        }
    },
    created() {
        const ref = db.collection('smoothies')
            .where('slug', '==', this.$route.params.slug);
        ref.get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.smoothie = Object.assign(doc.data(), {id: doc.id});
                this.smoothieTitle = this.smoothie.title;
            });
        }).catch(err=>console.error('There has been an error: ', err));
    }
}
</script>

<style>
    .edit-smoothie {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-smoothie h2 {
        font-size: 2em;
        margin: 20px auto;
    }
    .edit-smoothie .field {
        margin: 20px auto;
        position: relative;
    }
    .edit-smoothie .delete {
        position: absolute;
        color: #aaa;
        right: 0;
        bottom: 16px;
        cursor: pointer;
    }
</style>