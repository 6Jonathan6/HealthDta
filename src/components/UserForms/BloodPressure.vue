<template>
    <div id="user-form-container">
        <form @submit.prevent>
            <fieldset >
                <legend>Blood Presure</legend>
                <ul>
                    <li>
                        <label for="systolic">Systolic:</label>
                        <input type="number" v-model="systolic" min="0" step="0.01" id="systolic" required>
                    </li>
                    <li>
                        <label for="systolic">Diastolyc</label>
                        <input type="number" v-model="diastolyc" min="0" step="0.01" id="systolic" required>
                    </li>
                    <li>
                        <input type="submit" value="Save" >
                    </li>
                </ul>
            </fieldset>
        </form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      systolic: 0,
      diastolyc: 0
    };
  }
};
</script>

<style>
</style>

