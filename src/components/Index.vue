<template>
  <div class="index container">
    <div class="card" :key="smoothie.id" v-for="smoothie in smoothies">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{smoothie.title}}</h2>
        <ul class="ingredients">
          <li :key="ingredient" v-for="ingredient in smoothie.ingredients">
            <span class="chip">{{ingredient}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{name: 'EditSmoothie', params: {slug: smoothie.slug}}">
            <i class="material-icons edit">edit</i>
          </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js';
export default {
  name: 'Index',
  data () {
    return {
      smoothies: new Array()
    }
  },
  methods: {
    deleteSmoothie(id) {
      db.collection('smoothies').doc(id).delete()
        .then(()=>{
          this.smoothies = this.smoothies.filter(smoothie=>smoothie.id!==id);
        }).catch(err=>console.error('There has been an error:', err));
    }
  },
  created() {
    db.collection('smoothies').get()
      .then(snapshot=>{
        snapshot.forEach(doc=>{
          const smoothie = Object.assign(doc.data(), {id: doc.id});
          this.smoothies.push(smoothie);
        });
      });
  } 
}
</script>

<style>
  .index {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 60px;
  }
  .index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .index .ingredients {
    margin: 30px auto;
  }
  .index .ingredients li {
    display: inline-block;
  }
  .index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
</style>
