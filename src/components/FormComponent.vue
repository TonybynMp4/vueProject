<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import FieldComponent from './FieldComponent.vue';
import type { FormComponent } from '../types';

defineProps<FormComponent>();
</script>

<template>
    <form v-on:submit="onSubmit" :style="formStyle">
        <fieldset>
            <legend>{{ formLegend }}</legend>

            <FieldComponent v-for="field in fields" :key="field.id" :id="field.id" :label="field.label"
            :placeholder="field.placeholder" :type="field.type" :required="field.required" :defaultValue="field.defaultValue" />

            <section class="actions">
                <ButtonComponent v-for="action in actions" :key="action.id" :id="action.id" :label="action.label"
                    :type="action.type" />
            </section>
        </fieldset>
    </form>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

form {
    font-family: monospace;
    width: 50%;
}

fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.actions {
    flex-direction: row;
    gap: 1rem;
}

.actions button {
    flex: 1 1 auto;
}

#reset {
    flex: 0 1 auto;
}
</style>