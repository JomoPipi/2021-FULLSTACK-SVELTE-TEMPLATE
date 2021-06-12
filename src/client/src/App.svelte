<script lang="ts">

	export let name : string
	import { onMount } from 'svelte'
	let canvas : HTMLCanvasElement

	// Some random canvas animation, feel free to remove:
	onMount(() => {
		const ctx = canvas.getContext('2d')!
		let frame = requestAnimationFrame(loop)

		function loop(t : number) {
			frame = requestAnimationFrame(loop)

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

			for (let p = 0; p < imageData.data.length; p += 4)
			{
				const i = p / 4
				const x = i % canvas.width
				const y = i / canvas.height >>> 0

				const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000))
				const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000))
				const b = 128;

				imageData.data[p + 0] = r
				imageData.data[p + 1] = g
				imageData.data[p + 2] = b
				imageData.data[p + 3] = 255
			}

			ctx.putImageData(imageData, 0, 0)
		}

		return () => {
			cancelAnimationFrame(frame)
		}
	})

</script>

<main>
	<h1> HELLO {name}! </h1>
	<a href="/about">
	<canvas 
		bind:this={canvas}
		width={200}
		height={200}
	></canvas>
</a>
</main>

<style lang="scss">
	$col: #6200ff;
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		h1 {
			color: $col;
			text-transform: uppercase;
			font-size: 5em;
			font-weight: 100;
		}

		canvas {
			box-shadow: 5px 5px 5px black;
			animation: move 10s linear infinite;
		}
	}

	@keyframes move {
		0%	 { box-shadow: -5px 5px 5px black; }
		25%  { box-shadow: 5px 5px 5px black; }
		50%  { box-shadow: 5px -5px 5px black; }
		75%  { box-shadow: -5px -5px 5px black; }
		100% { box-shadow: -5px 5px 5px black; }
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>