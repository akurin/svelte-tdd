<script lang="ts">
  const fetchTodos = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    return await res.json();
  };
</script>

{#await fetchTodos()}
  <p>Loading...</p>
{:then todos}
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
{/await}

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
