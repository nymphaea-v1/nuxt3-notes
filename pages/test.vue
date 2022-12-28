<template>
  <div>
    {{ a }}
  </div>
  <div>
    {{ getArraySumFlat(a) }}
    {{ getArraySumRecursion(a) }}
  </div>
</template>

<script setup lang="ts">
const a = [1, 2, [3, 4, [5]], [1, 2]]

type nestedArray = (number | nestedArray)[]

function getArraySumRecursion (array: nestedArray) {
  let result = 0

  array.forEach(element => {
    result += Array.isArray(element) ? getArraySumRecursion(element) : element
  })

  return result
}

function getArraySumFlat (array: nestedArray) {
// @ts-ignore
  const flattenedArray: number[] = array.flat(Infinity)

  return flattenedArray.reduce((a, n) => a + n)
}
</script>
