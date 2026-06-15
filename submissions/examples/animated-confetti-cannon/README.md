# Animated Confetti Cannon

## What it does

Canvas-based confetti particle system that bursts colorful confetti pieces with gravity, rotation, and fade effects.

## How to use it

<button id="fireConfetti">Celebrate!</button>

<script>
document.getElementById('fireConfetti').addEventListener('click', () => {
    fireConfetti(x, y);
});
</script>

## Features

- 150 particles per burst
- 3 shape types (square, circle, triangle)
- Rainbow, gold, and default color palettes
- Realistic physics (gravity, drag, rotation)
- Smooth fade-out animation

## Variants

- fireConfetti(x, y, colors, count) - Custom position
- Rainbow burst - Multi-color celebration
- Gold burst - Premium gold confetti

## Why it fits EaseMotion CSS

- Canvas-based particle system
- Realistic physics
- Multiple celebration styles
- Perfect for success animations