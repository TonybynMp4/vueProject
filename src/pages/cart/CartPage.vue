<script setup lang="ts">
    import { ref } from 'vue';
</script>

<template>
    <main>
        <h1>Panier</h1>
        <p>Vous n'avez pas encore d'article dans votre panier.</p>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
</style>