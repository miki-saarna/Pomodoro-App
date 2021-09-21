function DurationSetter(event, time) {

    // variable that indicates whether it's a 'focus' or 'break' session
    const focusOrBreak = event.target.name;

    // variable used to determine if button pressed was incremental or decremental
    const decreaseButton = event.target.value;

    // sets lower and upper limits for time durationif during a 'focus' session
    if(focusOrBreak === 'focus') {
        decreaseButton === 'decrease' ? time -= 5 : time += 5;
        return Math.min(60, Math.max(5, time))
    }

    // sets lower and upper limits for time durationif during a 'break' session
    if(focusOrBreak === 'break') {
        decreaseButton === 'decrease' ? time -= 1 : time += 1;
        return Math.min(Math.max(time, 1), 15)
    }
}

export default DurationSetter;