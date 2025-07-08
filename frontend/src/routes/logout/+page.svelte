<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { setCookie } from "../../utils/cookie.util";

    onMount(() => {
        setCookie('token', '', 1)
        goto('/login')
    })
</script>