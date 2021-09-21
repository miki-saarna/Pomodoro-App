# Pomodoro Timer

Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique is a time management technique developed to maximize efficiency in work or study. This technique makes use of splitting the period of work in intervals, traditionally 25 minutes in length, separated by short breaks in between, about 5 minutes. Although the intervals of time can be adjusted, the Pomodoro technique has helped countless people maintain a well-structured and cohesive working or learning experience.

Our task is to replicate the Pomodoro timer, named after Cirillo's tomato-shaped kitchen timer, with the use of rendering and state management using React. The following defines the rubic as well as additional points we may be graded on:

## rubic

- props treated as read-only
- state updated using callbacks to avoid race conditions, unless next state is not determined by current state
- main Pomodoro free of conditional display logic: no `if` statements in the render function; each component determines its own visibility

## additional project feedback

- `prop.types` 
- `<> ... </>`
- pure functions
- clear variable/function names
- no conditional logic embedded in render functions
- single-state variable for active session: object with multiple properties

## fail:

- non-pure functions
- use of `if` statement instead of `Math.min()` and `Math.max()` to set lower/upper limits on time duration
- use of `if` statements in the returned JSX
- excessive conditional logic embedded in `useInterval()` hook