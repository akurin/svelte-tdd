<script lang="ts">
  import { onMount } from "svelte";

  let todos: Array<object> = [];
  let loading = true;
  onMount(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    todos = await res.json();
    loading = false;
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <table>
    <tr>
      <th>id</th>
      <th>title</th>
    </tr>
    {#each todos as todo}
      <tr>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  table {
    border-collapse: collapse;
    text-align: left;
  }
  th,
  td {
    border: 1px solid black;
    padding: 5px;
  }
</style>
